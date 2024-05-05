import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, sleep } from "@cn-ui/reactive";
import { createEffect } from "solid-js";
import { MessageBox, MessageBoxPanel } from "./Model";
import { Button } from "../button";
import { Message } from "../Message";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
    title: "Feedback 反馈组件/Modal1 模态框",
    component: MessageBoxPanel,
    argTypes: {},
} satisfies Meta<typeof MessageBoxPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageBoxPanel_: Story = {
    render() {
        const data = atom<{ name: string; id: string }[]>([], { equals: false });
        createEffect(() => {
            console.log(data());
        });
        return (
            <>
                <MessageBoxPanel title="标题党" description="jfdifjdisfjdifjdifjidsfldsfsdkfj" />
            </>
        );
    },
    args: {},
};
export const MessageBox_: Story = {
    render() {
        const data = atom<{ name: string; id: string }[]>([], { equals: false });
        createEffect(() => {
            console.log(data());
        });
        return (
            <>
                {(["confirm", "alert", "prompt"] as const).map((i) => {
                    return (
                        <Button
                            onclick={() => {
                                MessageBox[i](i, `${i}box`)
                                    .then((data) => {
                                        Message.success(JSON.stringify(data) || `${i}_success`);
                                    })
                                    .catch(() => {
                                        Message.info(i + "取消成功");
                                    });
                            }}
                        >
                            {i}
                        </Button>
                    );
                })}
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const layer = within(canvasElement.parentElement?.querySelector("#cn-ui-modal-layers")!);
        const doc = within(canvasElement.parentElement!);
        await step("点击 confirm 按钮", async () => {
            await userEvent.click(canvas.getByText("confirm"));
            await userEvent.click(layer.getByText("确认"));
            await sleep(300);
            expect(doc.getByText("confirm_success")).toBeInTheDocument();
            await userEvent.click(canvas.getByText("confirm"));
            await userEvent.click(layer.getByText("取消"));
            await sleep(300);
            expect(doc.getByText("confirm取消成功")).toBeInTheDocument();
        });
        await sleep(500);
        await step("点击 alert 按钮", async () => {
            await userEvent.click(canvas.getByText("alert"));
            await userEvent.click(layer.getByText("确认"));
            expect(doc.getByText("alert_success")).toBeInTheDocument();
        });
        await sleep(500);
        await step("点击 prompt 按钮", async () => {
            await userEvent.click(canvas.getByText("prompt"));
            await userEvent.type(layer.getByPlaceholderText("请输入文本"), "123");
            await userEvent.click(layer.getByText("确认"));
            await sleep(300);
            expect(doc.getByText('{"text":"123"}')).toBeInTheDocument();
            await userEvent.click(canvas.getByText("prompt"));
            await userEvent.click(layer.getByText("取消"));
            await sleep(300);
            expect(doc.getByText("prompt取消成功")).toBeInTheDocument();
        });
    },
};
