import { batch } from 'solid-js';
import { Atom } from 'solid-use';

/**
 * @zh 异步管式事件接管
 */

export const useEventController = (props: { disabled?: Atom<boolean> }) => {
    return <T extends (...args: any[]) => void | boolean | Promise<void | boolean>>(
        func: T | T[],
        options: {
            batch?: boolean;
            loading?: Atom<boolean>;
        } = {}
    ) => {
        const F = func instanceof Array ? func : [func];
        const channel = F.filter((i) => i);
        const final = async (...args: Parameters<T>) => {
            if (props.disabled && props.disabled()) return false;
            options.loading && options.loading(true);
            for (const iterator of channel) {
                const result = await iterator(...args);
                if (result === false) return false;
            }
            options.loading && options.loading(false);
            return true;
        };
        return options.batch ? (...args: Parameters<T>) => batch(() => final(...args)) : final;
    };
};
import { JSX } from 'solid-js';
/** @zh 在 control 中向组件外暴露事件
 *
 * @example
 *
 * control([
 *    emitEvent(props.onClick)
 * ])
 */
export const emitEvent = <
    Input extends any[],
    T extends (...args: Input) => void | boolean | Promise<void | boolean>
>(
    event: T | JSX.EventHandlerUnion<any, any> | undefined,
    propsChanger?: (args: Input) => Readonly<Parameters<T>>
) => {
    return (...args: Input) =>
        event && (event as T).apply(null, propsChanger ? propsChanger(args) : args);
};
