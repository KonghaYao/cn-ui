import { atom } from "@cn-ui/reactive";
import type { JSX, JSXElement } from "solid-js";
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
    Portal = function (this: EasyPortal, props: { children: JSXElement }) {
        this.store((i) => [...i, props.children]);
        return <></>;
    }.bind(this);
}
