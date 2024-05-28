import {
    type JSXSlot,
    OriginComponent,
    atom,
    ensureFunctionResult,
    extendsEvent,
    usePromise,
} from "@cn-ui/reactive";
import { For, Show } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { FloatingArea } from "../Message/runtime";
import "../animation/fade.css";
import { Button } from "../button";
import { BaseInput } from "../input";
import { zIndexManager } from "../popover/zIndexManager";

export interface MessageBoxPanelProps {
    title: string;
    description?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    cancelable?: boolean;
    messageSlot?: JSXSlot<MessageBoxPanelProps>;
}
export const MessageBoxPanel = OriginComponent<MessageBoxPanelProps>((props) => {
    return (
        <nav
            class="bg-design-regular rounded-xl text-center px-4 pb-2 pt-4 shadow-1 max-w-screen min-w-[15rem] w-fit min-h-[9rem] flex flex-col justify-evenly"
            {...extendsEvent(props)}
        >
            <div class="text-design-primary mb-1">{props.title}</div>
            <Show when={props.description}>
                <div class="description text-design-secondary">{props.description}</div>
            </Show>
            {ensureFunctionResult(props.messageSlot, [props])}
            <nav class="flex mt-2">
                <Show when={props.cancelable}>
                    <Button type="text" block onclick={props.onCancel}>
                        取消
                    </Button>
                </Show>
                <Button
                    type="text"
                    class="font-bold text-primary-600 "
                    block
                    onclick={props.onConfirm}
                >
                    确认
                </Button>
            </nav>
        </nav>
    );
});

export interface MessageBoxOptions extends MessageBoxPanelProps {
    mask?: boolean;
}

export class MessageBoxTemplate extends FloatingArea<MessageBoxOptions> {
    render() {
        return (
            <div class="cn-message-box">
                <Show when={this.store().length && this.store().some((i) => i.mask)}>
                    <div
                        class="cn-mask fixed top-0 left-0 h-screen w-screen bg-design-ultra-thin"
                        onclick={() => {
                            this.store().map((i) => i.onCancel!());
                        }}
                    />
                </Show>
                <TransitionGroup name="cn-fade">
                    <For each={this.store()}>
                        {(item) => {
                            return (
                                <div
                                    class="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
                                    style={{ "z-index": zIndexManager.getIndex() }}
                                >
                                    <MessageBoxPanel {...item} />
                                </div>
                            );
                        }}
                    </For>
                </TransitionGroup>
            </div>
        );
    }

    base<T>(
        title: string,
        message?: string,
        options: Partial<MessageBoxOptions> = {},
        returnData?: () => T,
    ) {
        const p = usePromise();
        const option: MessageBoxOptions = {
            ...options,
            title,
            description: message,
            onConfirm: () => {
                p.resolve(returnData?.()!);
                removeOption();
            },
            onCancel: () => {
                removeOption();
            },
        };

        this.store((i) => [...i, option]);

        const removeOption = () => {
            this.store((i) => i.filter((i) => i !== option));
            p.reject();
        };
        return p.promise;
    }
    alert(title: string, message?: string, options: Partial<MessageBoxOptions> = {}) {
        return this.base<null>(title, message, { ...options, cancelable: false });
    }
    prompt(title: string, message?: string, options: Partial<MessageBoxOptions> = {}) {
        const inputText = atom("");
        return this.base<{ text: string }>(
            title,
            message,
            {
                ...options,
                messageSlot() {
                    return <BaseInput v-model={inputText} class="my-2" type="text" />;
                },
                cancelable: true,
            },
            () => ({ text: inputText() }),
        );
    }
    confirm(title: string, message?: string, options: Partial<MessageBoxOptions> = {}) {
        return this.base(title, message, { ...options, cancelable: true });
    }
}
export const MessageBox = /* @__PURE__ */ new MessageBoxTemplate("cn-ui-modal-layers").createArea();
