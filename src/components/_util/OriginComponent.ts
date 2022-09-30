import { Component, createMemo, JSX, mergeProps } from 'solid-js';
import { classNames } from './classNames';

export const OriginComponent = <T extends JSX.HTMLAttributes<HTMLElement>>(
    comp: Component<
        Omit<T, 'style' | 'class'> & {
            style?: JSX.CSSProperties;
            class?: string[];
        }
    >
): Component<
    T & {
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
                    return Object.fromEntries(props.style.split(';').map((i) => i.split(':')));
                case 'object':
                    return props.style;
                default:
                    return {};
            }
        });
        // 类名统一转化为数组
        const classString = createMemo(() => {
            return classNames(props.class, props.className);
        });
        props = mergeProps(props, {
            style: style(),
            class: classString(),
        }) as any;
        return comp(props as any);
    };
};
