import type { Meta, StoryObj } from "storybook-solidjs";

import { NullAtom, atom } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { Flex } from "../container/Flex";
import { Checkbox, CheckboxGroup, type CheckboxGroupExpose, useControlCheckbox } from "./index";

const expectCheckBox = (el: HTMLElement) => {
    return expect(el.querySelector("input"));
};

const meta = {
    title: "Controls/Checkbox",
    component: Checkbox,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: "Checkbox 多选框",
    render() {
        const data = atom(false);
        return (
            <div class="flex gap-4">
                <Checkbox v-model={data} label={"恭喜发财"} value={"2333"} />
                <Checkbox disabled v-model={data} label={"disabled"} value={"2333"} />
                <span data-testid="state">{data() ? "选中" : "未选中"}</span>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step("初始状态测试", async () => {
            expect(await canvas.findByText("恭喜发财")).not.toBeDisabled();
            expectCheckBox(await canvas.findByText("disabled")).toBeDisabled();
            expect(await canvas.findByText("未选中")).toBeInTheDocument();
        });
        await step("状态切换测试", async () => {
            await userEvent.click(await canvas.findByText("恭喜发财"));
            expectCheckBox(await canvas.findByText("恭喜发财")).toBeChecked();
            expectCheckBox(await canvas.findByText("disabled")).toBeChecked();
            expect(await canvas.findByText("选中")).toBeInTheDocument();
        });
    },
};
const optionsWithDisabled = [
    { label: "苹果", value: "Apple" },
    { label: "梨子", value: "Pear" },
    { label: "橙子", value: "Orange", disabled: false },
];

export const Group: Story = {
    name: "CheckboxGroup 多选组",
    render() {
        const selected = atom<string[]>(["Apple"]);
        const checkBoxCtx = NullAtom<CheckboxGroupExpose>(null);
        const { indeterminate, isAllChecked, onChange } = useControlCheckbox(checkBoxCtx);
        return (
            <div class="flex gap-4">
                <Checkbox
                    indeterminate={indeterminate()}
                    v-model={isAllChecked}
                    label={"切换选中"}
                    value={"2333"}
                    onChange={onChange}
                />
                <CheckboxGroup
                    options={optionsWithDisabled}
                    v-model={selected}
                    expose={checkBoxCtx}
                />
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const toggleCheckbox = async (name: string, state = true) => {
            const el = await canvas.findByText(name);
            await userEvent.click(el);

            if (state) expectCheckBox(el).toBeChecked();
            if (state === false) expectCheckBox(el).not.toBeChecked();
        };

        await step("多选子按钮测试", async () => {
            expectCheckBox(await canvas.findByText("苹果")).toBeChecked();
            const total = canvas.getByText("切换选中");
            expectCheckBox(total).toBePartiallyChecked();
            await toggleCheckbox("苹果", false);

            await toggleCheckbox("梨子");
            expectCheckBox(total).toBePartiallyChecked();
            await toggleCheckbox("橙子");
            await toggleCheckbox("苹果");
            expectCheckBox(total).toBeChecked();
            await toggleCheckbox("橙子", false);
            expectCheckBox(total).toBePartiallyChecked();
        });
    },
};
export const RadioGroup: Story = {
    name: "Radio 单选框",
    render() {
        const selected = atom<string[]>(["Apple"]);
        return (
            <div class="flex gap-4">
                <Flex vertical>
                    <CheckboxGroup
                        options={optionsWithDisabled}
                        v-model={selected}
                        multiple={false}
                    />
                </Flex>
                <span>{selected().join("/")}</span>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const toggleCheckbox = async (name: string, state = true) => {
            await userEvent.click(await canvas.findByText(name));

            if (state) expectCheckBox(await canvas.findByText(name)).toBeChecked();
        };

        await step("多选子按钮测试", async () => {
            await toggleCheckbox("苹果");
            expect(await canvas.getByText("Apple")).toBeInTheDocument();
            await toggleCheckbox("梨子");
            expectCheckBox(await canvas.getByText("苹果")).not.toBeChecked();
            expect(await canvas.getByText("Pear")).toBeInTheDocument();
            await toggleCheckbox("橙子");
            expectCheckBox(await canvas.getByText("梨子")).not.toBeChecked();
            expectCheckBox(await canvas.getByText("苹果")).not.toBeChecked();
            expect(await canvas.getByText("Orange")).toBeInTheDocument();
        });
    },
};
