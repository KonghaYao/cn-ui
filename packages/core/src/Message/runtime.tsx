import { atom } from "@cn-ui/reactive";
import { type Accessor, type JSX, type JSXElement, createEffect, onCleanup } from "solid-js";
import { render } from "solid-js/web";

export const createRuntimeRoot = (id: string) => {
    if (!globalThis.window) {
        console.warn("CN-UI | Runtime Render Cancel");
        return;
    }
    const item = document.getElementById(id);
    if (item) {
        item.innerHTML = "";
        return item;
    }
    const runtimeArea = document.createElement("div");
    runtimeArea.id = id;
    document.body.appendChild(runtimeArea);
    return runtimeArea;
};

/** 全局创建一个子组件用于 Message、Notice 等组件的渲染 */
export const createRuntimeArea = (id: string, Comp: () => JSX.Element) => {
    const runtimeArea = createRuntimeRoot(id);
    if (!runtimeArea) return;
    return render(Comp, runtimeArea);
};

export class FloatingArea<T> {
    store = atom<T[]>([]);
    constructor(public id: string) {}
    public createArea() {
        createRuntimeArea(this.id, () => this.render());
        return this;
    }
    render() {
        return <></>;
    }
}
export class EasyPortal extends FloatingArea<JSXElement> {
    render() {
        return <>{this.store()}</>;
    }
    addRender(symbol: symbol, item: JSXElement) {
        if (this.cache.has(symbol)) return;
        this.store((i) => [...i, item]);
        this.cache.set(symbol, item);
    }
    removeRender(symbol: symbol) {
        if (!this.cache.has(symbol)) return;
        const cacheItem = this.cache.get(symbol)!;
        this.cache.delete(symbol);
        this.store((i) => {
            const arr = i.filter((i) => cacheItem !== i);
            return arr;
        });
    }
    // biome-ignore lint/suspicious/noExplicitAny: symbol will cause typescript error
    cache = new WeakMap<any, JSXElement>();
    Portal = function (this: EasyPortal, props: { children: JSXElement; show: Accessor<boolean> }) {
        const me = Symbol();
        createEffect(() => {
            props.show() ? this.addRender(me, props.children) : this.removeRender(me);
        });
        onCleanup(() => {
            this.removeRender(me);
        });
        return <></>;
    }.bind(this);
}
