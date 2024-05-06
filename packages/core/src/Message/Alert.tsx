import { type JSXSlot, OriginComponent, ensureFunctionResult, useMapper } from "@cn-ui/reactive";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillInfoCircle,
    AiFillWarning,
    AiOutlineClose,
} from "solid-icons/ai";
import { Show } from "solid-js";
import { Icon } from "../icon/Icon";

export interface AlertProps {
    closable?: boolean;
    icon?: boolean | JSXSlot;
    message: JSXSlot;
    border?: boolean;
    round?: boolean;
    description?: JSXSlot;
    type?: "success" | "info" | "warning" | "error";
    afterClose?: () => void;
    onClose?: (e: MouseEvent) => void;
}

export const Alert = OriginComponent<AlertProps>((props) => {
    const commonIconClass = "text-xl pr-2";
    const DynamicIcon = useMapper(props.type ?? "default", {
        success() {
            return (
                <Icon class={`text-green-600 ${commonIconClass}`}>
                    <AiFillCheckCircle />
                </Icon>
            );
        },
        info() {
            return (
                <Icon class={`text-blue-600 ${commonIconClass}`}>
                    <AiFillInfoCircle />
                </Icon>
            );
        },
        warning() {
            return (
                <Icon class={`text-yellow-600 ${commonIconClass}`}>
                    <AiFillWarning />
                </Icon>
            );
        },
        error() {
            return (
                <Icon class={`text-red-600 ${commonIconClass}`}>
                    <AiFillCloseCircle />
                </Icon>
            );
        },
        default() {
            return null;
        },
    });
    return (
        <div
            class={props.class(
                props.round && "rounded-md",
                "p-2 overflow-hidden border-1 border-design-separator",
            )}
        >
            <h3 class="flex items-center">
                {typeof props.icon === "boolean" ? DynamicIcon() : ensureFunctionResult(props.icon)}
                <span class="flex-1">{ensureFunctionResult(props.message)}</span>
                <Show when={props.closable}>
                    <Icon class="cursor-pointer transition-color" onclick={props?.onClose}>
                        <AiOutlineClose />
                    </Icon>
                </Show>
            </h3>
            <p
                class="pl-6"
                style={{
                    // bug: 不知为何这个地方不折行
                    "line-break": "anywhere",
                }}
            >
                {ensureFunctionResult(props.description)}
            </p>
        </div>
    );
});
