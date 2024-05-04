import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { createEffect } from "solid-js";
import { MessageBox, MessageBoxPanel } from "./Model";
import { Button } from "../button";
import { Message } from "../Message";

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
                                MessageBox[i](i, i + "box")
                                    .then((data) => {
                                        Message.success(JSON.stringify(data) || i);
                                    })
                                    .catch((i) => {
                                        Message.info("取消成功");
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
    args: {},
};
