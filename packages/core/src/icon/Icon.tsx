import { OriginComponent, extendsEvent } from "@cn-ui/reactive";
import type { JSXElement } from "solid-js";

export const Icon = OriginComponent<{
    spin?: boolean;
    children: JSXElement;
    clickable?: boolean;
}>((props) => {
    return (
        <span
            aria-hidden={!props.clickable}
            role={props.clickable ? "button" : undefined}
            class={props.class(
                props.spin && "animate-spin",
                "inline-flex items-center text-center leading-[0]",
            )}
            style={{
                ...props.style,
                "vertical-align": "-0.125em",
            }}
            {...extendsEvent(props)}
        >
            {props.children}
        </span>
    );
});

export const IconButton = OriginComponent<{
    children: JSXElement;
    spin?: boolean;
}>((props) => {
    return (
        <button
            type="button"
            class={props.class(
                props.spin && "animate-spin",
                "inline-flex items-center text-center leading-[0] cursor-pointer hover:bg-gray-300 p-2 rounded-md transition-colors",
            )}
            style={{
                ...props.style,
                "vertical-align": "-0.125em",
            }}
            {...extendsEvent(props)}
        >
            {props.children}
        </button>
    );
});
