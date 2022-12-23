import { render } from 'solid-js/web';
import { Relative } from '@cn-ui/core';
import { atom, Atom } from '@cn-ui/use';
import { Component, createContext, For, useContext } from 'solid-js';
import { Anime } from '@cn-ui/transition';

/** simple memorize result of function */
const memoize = function <T extends (...any: any[]) => any>(func: T) {
    let result = undefined;
    return (...args: Parameters<T>): ReturnType<T> => {
        if (result) return result;
        result = func(...args);
        return result;
    };
};
interface PositionData {
    // TODO 方向方案暂时没有确定
    OutSpaceLayer: Atom<Component[]>;
}
export const OutSpaceContext = createContext<PositionData>();
export class OutSpace {
    static inited = false;
    static OutSpaceLayer: Atom<Component[]>;
    static init() {
        if (this.inited) return this.OutSpaceLayer;
        this.inited = true;

        const OutSpaceLayer = atom<Component[]>([]);
        this.OutSpaceLayer = OutSpaceLayer;
        // 注意，这个没有被导出
        const OuterSpace = ({}) => {
            const space = useContext(OutSpaceContext);
            const style = {
                'z-index': 1000,
            };
            // ['top', 'tl', 'tr', 'bottom', 'bl', 'br', 'left', 'lt', 'lb', 'right', 'rt', 'rb'] as const;
            return (
                <Relative
                    fixed
                    class={' pointer-events-none top-0 left-0 h-screen w-screen '}
                    style={style}
                >
                    <For each={space.OutSpaceLayer()}>{(Item) => <Item></Item>}</For>
                </Relative>
            );
        };
        /** 向全局注入一个默认的 Layer 空间，生命周期为 solid 全生命 */
        render(() => {
            return (
                <OutSpaceContext.Provider value={{ OutSpaceLayer }}>
                    <OuterSpace></OuterSpace>
                </OutSpaceContext.Provider>
            );
        }, document.body);
        return OutSpaceLayer;
    }
    /** 添加独立的根组件 */
    static addLayerLikeSet(Comp: Component) {
        if (this.OutSpaceLayer().some((i) => i === Comp)) return false;
        this.OutSpaceLayer((i) => [...i, Comp]);
        return true;
    }
}
