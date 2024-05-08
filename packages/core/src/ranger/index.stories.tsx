import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { expect, fireEvent, getAllByRole, userEvent, within } from "@storybook/test";
import { Ranger } from "./";

const meta = {
    title: "Feedback 反馈组件/Ranger 抽屉组件",
    component: Ranger,
    argTypes: {},
} satisfies Meta<typeof Ranger>;

export default meta;
type Story = StoryObj<typeof meta>;
import { sleep } from "@cn-ui/reactive";
import { drag } from "./drag";

export const SingleRanger_: Story = {
    render() {
        const data = atom([10]);
        return (
            <>
                <Ranger v-model={data}></Ranger>
                <span data-testid="result">{data()[0]}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const doc = canvas.getByRole("slider").ownerDocument;
        await step("向右移动 Ranger", async () => {
            await fireEvent.mouseDown(canvas.getByRole("slider"));
            expect(canvas.getByTestId("result")).toHaveTextContent("10");
            await drag(canvas.getByRole("slider"), {
                handler: doc,
                delta: { x: 100 },
            });
            const biggerNumber = Number.parseInt(canvas.getByTestId("result").textContent!);
            expect(biggerNumber).toBeGreaterThan(10);

            await sleep(100);
            // 向左
            await userEvent.click(canvas.getByTestId("result"));
            await drag(canvas.getByRole("slider"), {
                handler: doc,
                delta: { x: -120 },
            });
            const smallNumber = Number.parseInt(canvas.getByTestId("result").textContent!);
            expect(smallNumber).toBeLessThan(biggerNumber);
        });

        await step("左界限", async () => {
            await fireEvent.mouseDown(canvas.getByRole("slider"));
            await drag(canvas.getByRole("slider"), {
                handler: doc,
                delta: { x: -10000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("0");
        });
        await step("右界限", async () => {
            await fireEvent.mouseDown(canvas.getByRole("slider"));
            await drag(canvas.getByRole("slider"), {
                handler: doc,
                delta: { x: 10000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("100");
        });
    },
};
export const Ranger_: Story = {
    render() {
        const data = atom([10, 20, 40, 50]);
        return (
            <>
                <Ranger max={200} min={-10} v-model={data} mode="range"></Ranger>
                <span data-testid="result">{JSON.stringify(data())}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const doc = canvasElement.ownerDocument;
        await step("更改数据", async () => {
            const slider = canvas.getAllByRole("slider");
            await drag(slider[0], {
                handler: doc,
                delta: { x: -1000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("[-10,20,40,50]");

            await drag(canvas.getAllByRole("slider")[3], {
                handler: doc,
                delta: { x: 1000000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("[-10,20,40,200]");
        });

        // overlap 未测试
    },
};
export const MultiRanger_: Story = {
    render() {
        const data = atom([10, 100, 20, 40]);
        return (
            <>
                <Ranger v-model={data} mode="multiple"></Ranger>
                <span data-testid="result">{JSON.stringify(data())}</span>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const doc = canvasElement.ownerDocument;
        await step("更改数据", async () => {
            const slider = canvas.getAllByRole("slider");
            await drag(slider[0], {
                handler: doc,
                delta: { x: -1000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("[0,20,40,100]");

            await drag(canvas.getAllByRole("slider")[2], {
                handler: doc,
                delta: { x: 1000000 },
            });
            expect(canvas.getByTestId("result")).toHaveTextContent("[0,20,100,100]");
        });
    },
};
