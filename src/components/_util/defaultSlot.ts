import { batch, JSXElement } from 'solid-js';
import { Atom } from 'solid-use';

/**
 * @zh 只有 undefined 时才使用默认样式,null 为不渲染
 */
export const defaultSlot = (defaultComp: JSXElement, slot?: JSXElement) => {
    return slot === undefined ? defaultComp : slot;
};

/**
 * @zh 异步管式事件接管
 */
export const useEventController = (props: { disabled?: Atom<boolean> }) => {
    return <T extends (...args: any[]) => void | boolean | Promise<void | boolean>>(
        func: T | T[],
        options: {
            batch?: boolean;
        } = {}
    ) => {
        const F = func instanceof Array ? func : [func];
        const channel = F.filter((i) => i);
        const final = async (...args: Parameters<T>) => {
            if (props.disabled && props.disabled()) return false;
            for (const iterator of channel) {
                const result = await iterator(...args);
                if (result === false) return false;
            }
            return true;
        };
        return options.batch ? (...args: Parameters<T>) => batch(() => final(...args)) : final;
    };
};

/** 在 control 中向组件外暴露事件 */
export const emitEvent = <
    Input extends any[],
    T extends (...args: any[]) => void | boolean | Promise<void | boolean>
>(
    event: T | undefined,
    propsChanger?: (args: Input) => Readonly<Parameters<T>>
) => {
    return (...args: Input) => event && event.apply(null, propsChanger ? propsChanger(args) : args);
};
