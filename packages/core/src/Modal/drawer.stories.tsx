import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, sleep } from "@cn-ui/reactive";
import { createEffect } from "solid-js";
import { Drawer } from "./";
import { Button } from "../button";
import { Message } from "../Message";
import { expect, userEvent, within } from "@storybook/test";

const meta = {
    title: "Feedback 反馈组件/Drawer 抽屉组件",
    component: Drawer,
    argTypes: {},
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drawer_: Story = {
    render() {
        const open = atom(false);
        return (
            <>
                <Button onclick={() => open(true)}>Open</Button>
                <Drawer v-model={open} title="Drawer" placement="left">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>
            </>
        );
    },
    args: {},
};
