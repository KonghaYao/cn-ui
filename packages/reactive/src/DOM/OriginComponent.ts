import { type Accessor, type Component, type JSX, createMemo, mergeProps } from "solid-js";
import { type Atom, atom } from "../atom/atom";
import { classNames } from "./classNames";
/** OriginComponent 函数内部的输入参数修改 */
export type OriginComponentInputType<T, RefType = HTMLElement, ModelType = string> = Omit<
    JSX.HTMLAttributes<RefType>,
    "style" | "class" | "children"
> & // 对内的类型注解
    Omit<T, "style" | "class"> & {
        id?: string;
        ref?: (el: RefType) => void;
        style: (...args: JSX.CSSProperties[]) => JSX.CSSProperties;
        class: typeof classNames;
        model: Atom<ModelType>;
        /** 方便直接写入 v-model 的语法糖 */
        $input: () => {
            value: ModelType;
            "on:input": (e: { target: { value: ModelType } }) => void | ModelType;
        };
        children?: ExtractChildren<T>;
    };

type ExtractChildren<T> = T extends { children: infer U } ? U : JSX.Element;
/** OriginComponent 函数封装的结果函数的入参 */
export type OriginComponentOutputType<T, RefType = HTMLElement, ModelType = string> = Omit<
    JSX.HTMLAttributes<RefType>,
    "style" | "class" | "children"
> & // 对外的类型注解
    Omit<T, "style" | "class"> & {
        ref?: (el: RefType) => void;
        style?: JSX.CSSProperties;
        className?: string | string[] | typeof classNames;
        class?: string | string[] | typeof classNames;
        classList?: { [k: string]: boolean } | typeof classNames;
        "v-model"?: Atom<ModelType> | Accessor<ModelType>;
        children?: ExtractChildren<T>;
    };

export type OriginComponentType = typeof OriginComponent;

/** 封装在组件外层，对内部提供 class style 等属性支持的装饰器 */
export const OriginComponent = <T, RefType = HTMLElement, ModelType = string>(
    comp: Component<OriginComponentInputType<T, RefType, ModelType>>,
    options: { modelValue?: ModelType } = {},
): Component<OriginComponentOutputType<T, RefType, ModelType>> => {
    return (props) => {
        // 将 style 统一转化为对象结构
        const style = (...args: JSX.CSSProperties[]) => {
            return Object.assign({}, props.style ?? {}, ...args);
        };
        // 类名统一转化为数组
        const classString: typeof classNames = (...args) => {
            return createMemo(() => {
                const c = typeof props.class === "function" ? props.class() : props.class;
                const cn =
                    typeof props.className === "function" ? props.className() : props.className;
                const cl =
                    typeof props.classList === "function" ? props.classList() : props.classList;
                return classNames(c, cn, cl, ...args);
            })();
        };
        // @ts-ignore
        const inputModel: Atom<ModelType> =
            props["v-model"] ??
            atom<ModelType>(options?.modelValue ?? (null as unknown as ModelType));
        const $input = () => ({
            value: inputModel(),
            "on:input"(e: { target: { value: ModelType } }) {
                return inputModel(() => e.target.value);
            },
        });
        const _props_ = mergeProps(props, {
            style,
            class: classString,
            model: inputModel,
            $input,
        } as OriginComponentInputType<T, RefType, ModelType>);

        return comp(_props_ as OriginComponentInputType<T, RefType, ModelType>);
    };
};
