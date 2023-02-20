import { JSX } from 'solid-js/jsx-runtime';

/** 合并这两种事件 onClick 和 onclick */
export const useEventProtect = <
    T extends string,
    F extends ((...args: any[]) => any) | JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>,
    D extends { [k in T]?: F }
>(
    props: D,
    /** 拥有大写的事件名称 */
    name: T
) => {
    const funcs = [props[name], props[name.toLowerCase()]].filter(
        (i) => typeof i === 'function'
    ) as F[];
    if (funcs.length === 0) return undefined;
    return function (...args) {
        return funcs.map((i) => (i as any).call(this, args))[1];
    } as F;
};
