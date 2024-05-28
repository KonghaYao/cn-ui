import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, sleep } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { createEffect } from "solid-js";
import { Message } from "../Message";
import { Button } from "../button";
import { Drawer } from "./";

const meta = {
    title: "Feedback 反馈组件/Drawer 抽屉组件",
    component: Drawer,
    argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drawer_: Story = {
    render() {
        const placement = atom<"left" | "right">("left");

        const open = atom(false);
        return (
            <>
                <Button
                    onclick={() => {
                        placement("left");
                        open(true);
                    }}
                >
                    Open Left
                </Button>
                <Button
                    onclick={() => {
                        placement("right");
                        open(true);
                    }}
                >
                    Open Right
                </Button>
                <div class="h-screen w-screen bg-gray-200"></div>
                <Drawer v-model={open} title={placement() + "_Drawer"} placement={placement()}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const layer = within(canvasElement.parentElement?.querySelector("#cn-ui-modal-layers")!);
        const doc = within(canvasElement.parentElement!);
        await userEvent.click(canvas.getByText("Open Left"));

        expect(layer.getByText("left_Drawer")).toBeInTheDocument();

        await userEvent.click(canvas.getByText("Open Right"));
        expect(layer.getByText("right_Drawer")).toBeInTheDocument();
    },
};
