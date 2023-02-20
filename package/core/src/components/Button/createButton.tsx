import { OriginComponentInputType } from '@cn-ui/use';
import { resource, DebounceAtom } from '@cn-ui/use';
import { ButtonProps } from './interface';
import { JSX } from 'solid-js/jsx-runtime';

// export const useButton = (props: OriginComponentInputType<ButtonProps, HTMLButtonElement>) => {
//     const query = resource(props.onClick ?? (() => {}), { immediately: false });
//     return {
//         // 设置 10 ms 是为了解决同步状态闪过问题
//         loading: DebounceAtom(query.loading, 10),
//         onClick(e) {
//             return query.refetch();
//         },
//     };
// };

/** 合并 onClick 和 onclick */
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
