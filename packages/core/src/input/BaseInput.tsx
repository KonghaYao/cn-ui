import {
    type Atom,
    NullAtom,
    OriginComponent,
    atomization,
    classHelper,
    computed,
    extendsEvent,
} from "@cn-ui/reactive";
import { ensureFunctionResult } from "@cn-ui/reactive";
import { type Accessor, Show, createMemo, mergeProps, onMount } from "solid-js";
import type { JSXElement } from "solid-js";
import { Dynamic } from "solid-js/web";
import { useElementHover } from "solidjs-use";
import { type BaseFormItemType, extendsBaseFormItemProp } from "../form/BaseFormItemType";
import "./index.css";
import { type FocusOptions, triggerFocus } from "./triggerFocus";
import { type CountProps, useTextCount } from "./useTextCount";
// Character count config
export interface CountConfig {
    max?: number; // Max character count. Different from the native `maxLength`, it will be marked warning but not truncated
    strategy?: (value: string) => number; // Custom character count, for example, the standard emoji length is greater than 1, you can customize the counting strategy to change it to 1
    show?: boolean | ((args: { value: string; count: number; maxLength?: number }) => JSXElement); // Same as `showCount`
    exceedFormatter?: (value: string, config: CountConfig) => string; // Custom clipping logic when the number of characters exceeds `count.max`, no clipping when not configured
}

export interface InputExpose {
    inputType: Atom<string>;
    isHovering: Accessor<boolean>;
    model: Atom<string>;
    focus: (opts: FocusOptions) => void;
    disabled: Accessor<boolean>;
}

export interface BaseInputProps extends Omit<CountProps, "model">, BaseFormItemType {
    /**
     * input 的 id，而不是外层的
     * @tested
     */
    id?: string;
    /**
     * 前置图标
     * @tested
     */
    prefixIcon?: JSXElement | ((expose: InputExpose) => JSXElement);
    /**
     * 后置图标
     * @tested
     */
    suffixIcon?: JSXElement | ((expose: InputExpose) => JSXElement);
    rounded?: boolean;
    /**
     * input type 属性
     * @tested
     */
    type?: "text" | "textarea" | "password" | string;
    expose?: (expose: InputExpose) => void;
    /**
     * textarea 自动高度
     * @tested
     */
    autoSize?: boolean;
    resize?: boolean;
    wrapperRef?: (el: HTMLSpanElement) => void;
}

export const BaseInput = OriginComponent<BaseInputProps, HTMLInputElement, string>((props) => {
    props = mergeProps(
        {
            placeholder: "请输入文本",
            rounded: true,
        },
        props,
    );
    const inputEl = NullAtom<HTMLInputElement>(null);
    const inputWrapper = NullAtom<HTMLSpanElement>(null);
    const inputType = atomization(props.type ?? "text");
    const isHovering = useElementHover(inputWrapper);
    const expose: InputExpose = {
        inputType,
        model: props.model,
        focus(opts) {
            triggerFocus(inputEl()!, opts);
        },
        isHovering,
        disabled: () => !!props.disabled,
    };
    onMount(() => {
        props.expose?.(expose);
    });
    /** 域内前缀 */
    const Prefix = computed(() => {
        const child = ensureFunctionResult(props.prefixIcon, [expose]);
        return <Show when={child}>{<span class="mr-1 flex-none">{child}</span>}</Show>;
    });
    const { TextCount, textLengthControl } = useTextCount(props);
    textLengthControl();
    /** 域内后缀 */
    const Suffix = computed(() => {
        const child = ensureFunctionResult(props.suffixIcon, [expose]);
        return (
            <Show when={child || TextCount}>
                <span class="ml-1 text-gray-400 flex-none">
                    {child}
                    {TextCount}
                </span>
            </Show>
        );
    });
    const isTextarea = createMemo(() => props.type === "textarea");
    return (
        <span
            ref={(el) => {
                inputWrapper(el);
                return props.wrapperRef?.(el);
            }}
            aria-disabled={props.disabled}
            class={props.class(
                classHelper.base(
                    "cn-base-input transition inline-flex border  py-1 px-3 text-sm text-design-primary ",
                    isTextarea() && props.autoSize && "cn-textarea-auto-size",
                    props.rounded && "rounded",
                )(
                    props.readonly && "cursor-default",
                    props.disabled &&
                        "border-design-separator bg-gray-100 text-gray-400 opacity-50",
                    props.error && "border-red-300",
                    "border-design-separator hover:border-blue-400",
                ),
            )}
            data-replicated-value={isTextarea() && props.autoSize ? props.model() : undefined}
            style={props.style()}
        >
            {Prefix()}
            <Dynamic
                component={isTextarea() ? "textarea" : "input"}
                ref={(el: HTMLInputElement) => {
                    inputEl(el);
                    return props.ref?.(el);
                }}
                id={props.id}
                type={inputType()}
                class={classHelper.base(
                    "bg-transparent appearance-none outline-none w-full",
                    !props.resize && "resize-none",
                )(props.disabled && " cursor-not-allowed")}
                {...extendsBaseFormItemProp(props)}
                {...props.$input()}
                {...extendsEvent(props)}
            />

            {Suffix()}
        </span>
    );
});
export const Input = BaseInput;
