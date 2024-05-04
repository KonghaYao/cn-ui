import {
    JSXSlot,
    OriginComponent,
    atom,
    ensureFunctionResult,
    extendsEvent,
} from "@cn-ui/reactive";
import { Button } from "../button";
import { For, Show } from "solid-js";
import { type FloatingArea, createRuntimeArea } from "../Message/runtime";
import { Center } from "../container";
import { BaseInput } from "../input";

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
            class="rounded-xl text-center px-4 pb-2 pt-4 shadow-1 max-w-screen min-w-[15rem] w-fit min-h-[9rem] flex flex-col justify-evenly"
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

export class MessageBoxTemplate implements FloatingArea<unknown> {
    constructor(public id: string) {
        createRuntimeArea(id, () => this.render());
    }
    render() {
        return (
            <Center class="cn-message-box pointer-events-none ">
                <For each={this.messageStack()}>
                    {(item) => {
                        return (
                            <div class="pointer-events-auto">
                                <MessageBoxPanel {...item}></MessageBoxPanel>
                            </div>
                        );
                    }}
                </For>
            </Center>
        );
    }
    private messageStack = atom<MessageBoxPanelProps[]>([]);

    base<T>(
        title: string,
        message?: string,
        options: Partial<MessageBoxPanelProps> = {},
        returnData?: () => T,
    ) {
        return new Promise<T>((res, rej) => {
            const option: MessageBoxPanelProps = {
                ...options,
                title,
                description: message,
                onConfirm: () => {
                    removeOption();
                    res(returnData?.()!);
                },
                onCancel: () => {
                    removeOption();
                    rej();
                },
            };
            const removeOption = () => this.messageStack((i) => i.filter((i) => i !== option));
            this.messageStack((i) => [...i, option]);
        });
    }
    alert(title: string, message?: string, options: Partial<MessageBoxPanelProps> = {}) {
        return this.base<null>(title, message, { ...options, cancelable: false });
    }
    prompt(title: string, message?: string, options: Partial<MessageBoxPanelProps> = {}) {
        const inputText = atom("");
        return this.base<{ text: string }>(
            title,
            message,
            {
                ...options,
                messageSlot() {
                    return <BaseInput v-model={inputText} class="my-2" type="text" />;
                },
            },
            () => ({ text: inputText() }),
        );
    }
    confirm(title: string, message?: string, options: Partial<MessageBoxPanelProps> = {}) {
        return this.base(title, message, { ...options, cancelable: true });
    }
}
export const MessageBox = /* @__PURE__ */ new MessageBoxTemplate("cn-ui-modal-layers");
