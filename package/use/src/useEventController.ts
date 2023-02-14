import { batch } from 'solid-js';
import { Atom } from '@cn-ui/reactive';

/**
 * @zh 异步管式事件接管
 * @param props.oneLine 是否锁定态执行函数，默认锁定执行
 */
export const useEventController = (props: { disabled?: Atom<boolean>; oneLine?: boolean }) => {
    return <T extends (...args: any[]) => void | boolean | Promise<void | boolean>>(
        func: T | T[],
        options: {
            batch?: boolean;
            loading?: Atom<boolean>;
        } = {}
    ) => {
        const F = func instanceof Array ? func : [func];
        const channel = F.filter((i) => i);

        /** 主体执行函数 */
        let final = async (...args: Parameters<T>) => {
            if (props.disabled && props.disabled()) return false;

            options.loading && options.loading(true);
            for await (const iterator of channel) {
                const result = await iterator(...args);
                if (result === false) return false;
            }
            options.loading && options.loading(false);
            return true;
        };

        // 以下为修饰器
        if (props.oneLine !== false) final = asyncLock(final);
        if (options.batch) final = (...args: Parameters<T>) => batch(() => final(...args));
        return final;
    };
};
import { JSX } from 'solid-js';
import { asyncLock } from '@cn-ui/reactive';
/**
 * @zh 配合 useEventController 向组件外暴露异步事件流
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
        event ? (event as T).apply(null, propsChanger ? propsChanger(args) : args) : undefined;
};
