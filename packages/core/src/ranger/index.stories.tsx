import type { Meta, StoryObj } from "storybook-solidjs";

import { Ranger } from "./";
import { expect, userEvent, within } from "@storybook/test";
import { atom } from "@cn-ui/reactive";

const meta = {
    title: "Feedback 反馈组件/Ranger 抽屉组件",
    component: Ranger,
    argTypes: {},
} satisfies Meta<typeof Ranger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleRanger_: Story = {
    render() {
        const data = atom([10]);
        return (
            <>
                <Ranger v-model={data}></Ranger>
                <span>{JSON.stringify(data())}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {},
};
export const Ranger_: Story = {
    render() {
        const data = atom([10, 20, 40, 50]);
        return (
            <>
                <Ranger v-model={data} mode="range"></Ranger>
                <span>{JSON.stringify(data())}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {},
};
export const MultiRanger_: Story = {
    render() {
        const data = atom([10, 100, 20, 40]);
        return (
            <>
                <Ranger v-model={data} mode="multiple"></Ranger>
                <span>{JSON.stringify(data())}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {},
};
