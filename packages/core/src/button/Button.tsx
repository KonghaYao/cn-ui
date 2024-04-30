import { type JSXSlot, OriginComponent, ensureFunctionResult, extendsEvent } from "@cn-ui/reactive";
import { Match, Switch } from "solid-js";
import { GlobalButtonSlots } from "./ButtonSlots";
import { createDisabledClass } from "./style/createDisabledClass";
import { createTypeClass } from "./style/createTypeClass";

export interface ButtonProps extends ButtonSlots {
    /**
     * 按钮类型
     * @tested
     */
    type?: "primary" | "dashed" | "link" | "default" | "text";
    /**
     * 按钮的HTML类型
     * @tested
     */
    htmlType?: HTMLButtonElement["type"];

    /**
     * 按钮的形状
     * @tested
     */
    shape?: "default" | "circle" | "round";
    /**
     * 按钮是否禁用
     * @tested
     */
    disabled?: boolean;
    /**
     * 按钮是否加载中
     * @tested
     */
    loading?: boolean;

    /**
     * 加载中的文本
     * @tested
     */
    loadingText?: string;
    /**
     * 按钮是否为危险按钮
     * @tested
     */
    danger?: boolean;
    /**
     * 按钮是否为块级按钮
     * @tested
     */
    block?: boolean;
    /**
     * 按钮是否为圆形按钮
     * @tested
     */
    circle?: boolean;
}
export interface ButtonSlots {
    /**
     * 按钮的图标
     * @tested
     */
    icon?: JSXSlot;
    /**
     * loading 按钮的图标
     * @tested
     */
    loadingIcon?: JSXSlot;
}

/** 基础按钮组件 */
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((props) => {
    const typeClass = createTypeClass(props as ButtonProps);
    const disabledClass = createDisabledClass(props as ButtonProps);

    return (
        <button
            id={props.id}
            ref={props.ref}
            type={props.htmlType ?? "button"}
            class={props.class(
                "cn-button transition-colors outline-none select-none ",
                props.loading && "pointer-events-none opacity-50",
                props.circle ? "rounded-full px-2 py-1" : "rounded-md  px-4 py-1 ",
                props.block && "block w-full",
                props.disabled ? disabledClass() : typeClass(),
            )}
            style={props.style()}
            disabled={props.disabled}
            aria-live={props.loading ? "polite" : undefined}
            {...extendsEvent(props)}
        >
            <Switch
                fallback={
                    <>
                        {ensureFunctionResult(props.icon)}
                        {props.children}
                    </>
                }
            >
                <Match when={props.loading}>
                    {GlobalButtonSlots.renderSlotAsDefault("loadingIcon", props.loadingIcon)}
                    {props.loadingText ?? "加载中"}
                </Match>
            </Switch>
        </button>
    );
});
