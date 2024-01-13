import { Component, createMemo, JSX, mergeProps, children } from 'solid-js';
import { classNames } from './classNames';
import { Atom } from '../atom/atom';

/** OriginComponent 函数内部的输入参数修改 */
export type OriginComponentInputType<T, RefType = HTMLElement, ModelType = string> =
    // 对内的类型注解
    Omit<T, 'style' | 'class'> & {
        ref?: RefType | ((el: RefType) => void);
        style: JSX.CSSProperties;
        class: typeof classNames;
        model?: Atom<ModelType>;
        /** 方便直接写入 v-model 的语法糖 */
        $input: () => {
            value: ModelType;
            'on:input': JSX.InputEventHandlerUnion<HTMLInputElement, InputEvent>;
        };
    };
/** OriginComponent 函数封装的结果函数的入参 */
export type OriginComponentOutputType<T, RefType = HTMLElement, ModelType = string> =
    // 对外的类型注解
    Omit<T, 'style' | 'class'> & {
        ref?: RefType | ((el: RefType) => void);
        style?: JSX.CSSProperties;
        className?: string | string[] | typeof classNames;
        class?: string | string[] | typeof classNames;
        classList?: { [k: string]: boolean } | typeof classNames;
        'v-model'?: Atom<ModelType>;

        children?: JSX.Element;
    };

export type OriginComponentType = typeof OriginComponent;

/** 封装在组件外层，对内部提供 class style 等属性支持的装饰器 */
export const OriginComponent = <T, RefType = HTMLElement, ModelType = string>(
    comp: Component<OriginComponentInputType<T, RefType, ModelType>>
): Component<OriginComponentOutputType<T, RefType, ModelType>> => {
    return (props) => {
        // 将 style 统一转化为对象结构
        const style = createMemo<JSX.CSSProperties>(() => {
            switch (typeof props.style) {
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
                const cn = typeof props.className === 'function' ? props.className() : props.className;
                const cl = typeof props.classList === 'function' ? props.classList() : props.classList;
                return classNames(c, cn, cl, ...args);
            })();
        };
        const $input = () => ({
            value: props['v-model']?.(),
            'on:input'(e) {
                return props['v-model']?.(() => e.target.value);
            },
        });
        let _props_ = mergeProps(props, {
            style: style(),
            class: classString,
            model: props['v-model'],
            $input,
        } as OriginComponentInputType<T, RefType, ModelType>);

        return comp(_props_ as OriginComponentInputType<T, RefType, ModelType>);
    };
};
