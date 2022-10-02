import { Component, createMemo, JSX, mergeProps, splitProps } from 'solid-js';
import { classNames } from './classNames';

export const OriginComponent = <T extends JSX.HTMLAttributes<RefType>, RefType = HTMLElement>(
    comp: Component<
        // 对内的类型注解
        Omit<T, 'style' | 'class'> & {
            ref?: RefType | ((el: RefType) => void);
            style?: JSX.CSSProperties;
            class?: typeof classNames;
        }
    >
): Component<
    // 对外的类型注解
    T & {
        ref?: RefType | ((el: RefType) => void);
        style?: string | JSX.CSSProperties;
        className?: string | string[];
        class?: string | string[];
    }
> => {
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
                return classNames(props.class, props.className, ...args);
            })();
        };
        let _props_ = mergeProps(props, {
            style: style(),
            class: classString,
        }) as any;

        return comp(_props_ as any);
    };
};
