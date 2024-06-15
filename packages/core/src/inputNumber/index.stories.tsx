import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "../button";
import { InputNumber } from "./index";

const meta = {
    title: "Controls/InputNumber",
    component: InputNumber,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof InputNumber>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        const data = atom(123232);
        return (
            <div class="flex gap-4">
                <InputNumber min={0} max={100} v-model={data} controls />
                <div>{data()}</div>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const typeAndCheck = async (el: HTMLInputElement, value: string) => {
            await userEvent.clear(el);
            await userEvent.type(el, value);
            el.blur();
            return expect(el);
        };

        await step("检查初始状态", async () => {
            expect(canvas.getByRole("spinbutton")).toHaveValue("123,232");

            await expect(canvas.getByText("123232")).toBeInTheDocument();
        });
        await step("加减按钮测试", async () => {
            await userEvent.click(canvas.getByLabelText("increment value"));
            expect(canvas.getByRole("spinbutton")).toHaveValue("100");
            await userEvent.click(canvas.getByLabelText("increment value"));
            await userEvent.click(canvas.getByLabelText("increment value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            await userEvent.click(canvas.getByLabelText("decrease value"));
            expect(canvas.getByRole("spinbutton")).toHaveValue("94");
        });
        await step("输入测试", async () => {
            const input: HTMLInputElement = canvas.getByRole("spinbutton");
            await userEvent.clear(canvas.getByRole("spinbutton"));
            expect(canvas.getByRole("spinbutton")).toHaveValue("");
            expect(canvas.getByText("NaN")).toBeInTheDocument();

            (await typeAndCheck(input, "96")).toHaveValue("96");

            (await typeAndCheck(input, "1024")).toHaveValue("100");

            (await typeAndCheck(input, "-1024")).toHaveValue("0");

            (await typeAndCheck(input, "52.3")).toHaveValue("52.3");
        });
    },
};

export const Disabled: Story = {
    name: "Disabled",
    render() {
        const data = atom(123232);
        const disabled = atom(true);
        return (
            <div class="flex gap-4">
                <Button type="primary" onclick={() => disabled((i) => !i)}>
                    Toggle Disabled
                </Button>
                <InputNumber disabled={disabled()} min={0} v-model={data} controls />
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step("状态切换", async () => {
            expect(canvas.getByRole("spinbutton")).toHaveValue("123,232");
            expect(canvas.getByRole("spinbutton")).toBeDisabled();
            await userEvent.click(canvas.getByText("Toggle Disabled"));

            expect(canvas.getByRole("spinbutton")).not.toBeDisabled();
            await userEvent.click(canvas.getByText("Toggle Disabled"));
            expect(canvas.getByRole("spinbutton")).toBeDisabled();
        });
    },
};
export const allowMouseWheel: Story = {
    name: "MouseWheel",
    render() {
        const data = atom(200);
        return (
            <div class="flex gap-4">
                <InputNumber allowMouseWheel min={0} max={100} v-model={data} />
            </div>
        );
    },
    args: {},
};
export const precision: Story = {
    name: "Precision",
    render() {
        const data = atom(200);
        return (
            <div class="flex gap-4">
                <InputNumber
                    allowMouseWheel
                    precision={4}
                    step={0.0001}
                    min={0}
                    max={100}
                    v-model={data}
                />
            </div>
        );
    },
    // play: async ({ canvasElement, step }) => {
    //     const canvas = within(canvasElement);
    //     const typeAndCheck = async (el: HTMLInputElement, value: string) => {
    //         await userEvent.clear(el);
    //         await userEvent.type(el, value);

    //         el.blur();
    //         await sleep(100);
    //         return expect(el);
    //     };
    //     //TODO 状态切换不稳定问题
    //     await step("状态切换", async () => {
    //         await (await typeAndCheck(canvas.getByRole("spinbutton"), "123.232")).toHaveValue(
    //             "100.0000",
    //         );
    //         await sleep(100);
    //         await (await typeAndCheck(canvas.getByRole("spinbutton"), "99.0001")).toHaveValue(
    //             "99.0001",
    //         );
    //     });
    // },
};
