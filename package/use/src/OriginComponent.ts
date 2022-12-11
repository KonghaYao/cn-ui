import { Component, createMemo, JSX, mergeProps, splitProps } from 'solid-js';
import { classNames } from './classNames';

/** OriginComponent 函数内部的输入参数修改 */
export type OriginComponentInputType<T, RefType = HTMLElement> =
    // 对内的类型注解
    Omit<T, 'style' | 'class'> & {
        ref?: RefType | ((el: RefType) => void);
        style: JSX.CSSProperties;
        class: typeof classNames;
    };
/** OriginComponent 函数封装的结果函数的入参 */
export type OriginComponentOutputType<T, RefType = HTMLElement> =
    // 对外的类型注解
    Omit<T, 'style' | 'class'> & {
        ref?: RefType | ((el: RefType) => void);
        style?: string | JSX.CSSProperties;
        className?: string | string[] | typeof classNames;
        class?: string | string[] | typeof classNames;
        classList?: { [k: string]: boolean } | typeof classNames;
    };
export type OriginComponentType = <T, RefType = HTMLElement>(
    comp: Component<OriginComponentInputType<T, RefType>>
) => Component<OriginComponentOutputType<T, RefType>>;
export const OriginComponent: OriginComponentType = (comp) => {
    return (props) => {
        // 将 style 统一转化为对象结构
        const style = createMemo<JSX.CSSProperties>(() => {
            switch (typeof props.style) {
                case 'string':
                    return createMemo(() =>
                        Object.fromEntries(
                            (props.style as string).split(';').map((i) => i.split(':'))
                        )
                    )();
                case 'object':
                    return props.style;
                default:
                    return {};
            }
        });
        // 类名统一转化为数组
        const classString: typeof classNames = (...args) => {
            return createMemo(() => {
                const c = typeof props.class === 'function' ? props.class() : props.class;
                const cn =
                    typeof props.className === 'function' ? props.className() : props.className;
                const cl =
                    typeof props.classList === 'function' ? props.classList() : props.classList;
                return classNames(c, cn, cl, ...args);
            })();
        };
        let _props_ = mergeProps(props, {
            style: style(),
            class: classString,
        }) as any;

        return comp(_props_ as any);
    };
};
