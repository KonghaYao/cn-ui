import { Portal, render } from 'solid-js/web';
import { Relative } from '@cn-ui/core';
import { atom, Atom, createTemplate, SlotMap } from '@cn-ui/use';
import { Component, createContext, For, useContext } from 'solid-js';

/** simple memorize result of getOutSpace */
const memoize = function <T extends Function>(func: T) {
    let result = undefined;
    return (...args: any[]) => {
        if (result) return result;
        result = func(...args);
        return result;
    };
};
interface PositionData {
    // TODO 方向方案暂时没有确定
    top: Atom<Component[]>;
    tl: Atom<Component[]>;
    tr: Atom<Component[]>;
    bottom: Atom<Component[]>;
    bl: Atom<Component[]>;
    br: Atom<Component[]>;
    left: Atom<Component[]>;
    lt: Atom<Component[]>;
    lb: Atom<Component[]>;
    right: Atom<Component[]>;
    rt: Atom<Component[]>;
    rb: Atom<Component[]>;
}
export const OutSpaceContext = createContext<PositionData>();

export const getOutSpace = memoize(() => {
    const OutSpaceData = {
        top: atom([]),
        tl: atom([]),
        tr: atom([]),
        bottom: atom([]),
        bl: atom([]),
        br: atom([]),
        left: atom([]),
        lt: atom([]),
        lb: atom([]),
        right: atom([]),
        rt: atom([]),
        rb: atom([]),
    } as PositionData;
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
                <For each={space.top()}>
                    {/* @ts-ignore */}
                    {(item) => item()}
                </For>
            </Relative>
        );
    };
    /** 向全局注入一个默认的 Layer 空间，生命周期为 solid 全生命 */
    render(() => {
        return (
            <OutSpaceContext.Provider value={OutSpaceData}>
                <OuterSpace></OuterSpace>;
            </OutSpaceContext.Provider>
        );
    }, document.body);
    return OutSpaceData;
});
