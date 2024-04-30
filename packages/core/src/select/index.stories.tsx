import type { Meta, StoryObj } from "storybook-solidjs";

import { type SelectOptionsType, atom, computed, genArray, resource, sleep } from "@cn-ui/reactive";
import { isElementRealVisible, scrollElement } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import Mock from "mockjs-ts";
import { JSONViewer } from "../dataViewer";
import { Select } from "./index";
const meta = {
    title: "Controls/Select 选择器",
    component: Select,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: "Select 单选框",
    render() {
        const selected = atom([]);
        return (
            <div class="flex gap-4">
                <Select
                    v-model={selected}
                    aria-label="selected-filterable"
                    filterable
                    options={[
                        {
                            value: "jack",
                            label: "Jack",
                        },
                        {
                            value: "lucy",
                            label: "Lucy",
                        },
                        {
                            value: "tom",
                            label: "Tom",
                        },
                    ]}
                />
                <Select
                    v-model={selected}
                    aria-label="selected"
                    options={[
                        {
                            value: "jack",
                            label: "Jack",
                        },
                        {
                            value: "lucy",
                            label: "Lucy",
                        },
                        {
                            value: "tom",
                            label: "Tom",
                        },
                    ]}
                />
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step("检查点击弹出", async () => {
            await userEvent.click(canvas.getByLabelText("selected-filterable"));
            expect(canvas.getByRole("tooltip")).toBeInTheDocument();
            expect(canvas.getByRole("listbox")).toBeInTheDocument();
            expect(canvas.getByText("Jack")).toBeInTheDocument();
            expect(canvas.getByText("Lucy")).toBeInTheDocument();
            expect(canvas.getByText("Tom")).toBeInTheDocument();

            // 点击别的地方隐藏
            await userEvent.click(canvasElement);
            expect(canvas.getByText("Jack")).not.toBeVisible();
            expect(canvas.getByText("Lucy")).not.toBeVisible();
            expect(canvas.getByText("Tom")).not.toBeVisible();
        });
        await step("检查选中切换", async () => {
            const filterable = canvas.getByLabelText("selected-filterable");
            const another = canvas.getByLabelText("selected");

            await userEvent.click(canvas.getByText("Jack"));
            filterable.focus();
            await sleep(200);
            expect(filterable).toHaveAttribute("placeholder", "Jack");

            filterable.blur();
            await sleep(200);

            expect(filterable).toHaveValue("Jack");
            expect(another).toHaveValue("Jack");
        });
        await step("filterable 测试", async () => {
            const filterable = canvas.getByLabelText("selected-filterable");

            filterable.focus();
            await sleep(100);
            canvas.getAllByRole("option").forEach((i) => {
                expect(i).toBeVisible();
            });
            expect(canvas.getAllByRole("option").length).toBe(3);

            await userEvent.type(filterable, "Luc");
            await userEvent.click(canvas.getByText("Lucy"));
            expect(filterable).toHaveDisplayValue("Lucy");
        });
    },
};

export const Multi: Story = {
    name: "Multiple 多选",
    render() {
        const res = resource(
            async () =>
                genArray(10).map((i) => ({
                    label: new Intl.NumberFormat("en-IN").format(i * 2000),
                    value: `${i}`,
                })),
            { initValue: [] },
        );
        const selected = atom([]);
        const options = computed(() => [{ label: "Jack", value: "jack" }, ...res()]);
        return (
            <>
                <div class="flex gap-4">
                    <Select
                        aria-label="multi-select"
                        v-model={selected}
                        disabledOptions={["jack"]}
                        multiple
                        options={options()}
                    />
                    <Select
                        aria-label="multi-select-copy"
                        v-model={selected}
                        disabledOptions={["jack"]}
                        multiple
                        options={options()}
                    />
                </div>
                <JSONViewer data={selected()} />
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const selectOption = async (key: string, selected = true, scope = canvas) => {
            const zero = scope.getAllByRole("option").find((i) => i.textContent === key);
            await userEvent.click(zero!);
            if (selected) expect(zero).toHaveAttribute("aria-selected", "true");
        };

        await step("检查 disabled", async () => {
            await sleep(100);
            await userEvent.click(canvas.getByLabelText("multi-select"));
            expect(canvas.getAllByRole("option")[0]).toHaveAttribute("aria-disabled", "true");
            expect(canvas.getAllByRole("option")[0]).toBeInTheDocument();

            expect(canvas.getByText("0")).not.toHaveAttribute("aria-disabled", "true");
            expect(canvas.getByText("0")).toBeVisible();

            expect(canvas.getByText("18,000")).not.toHaveAttribute("aria-disabled", "true");
            expect(canvas.getByText("18,000")).toBeVisible();

            await userEvent.click(canvasElement);
            expect(canvas.getByText("0")).not.toBeVisible();
            expect(canvas.getByText("18,000")).not.toBeVisible();
        });
        await step("多选状态切换", async () => {
            await userEvent.click(canvas.getByLabelText("multi-select"));

            await userEvent.click(canvas.getByText("Jack"));
            expect(canvas.getByText("Jack")).not.toHaveAttribute("aria-selected");

            await selectOption("0");
            await selectOption("2,000");
            await selectOption("4,000");
            await selectOption("18,000");
            await selectOption("2,000", false);

            await sleep(1000); // 动画时间
            for (const item of canvasElement.querySelectorAll(".cn-selected-tags")) {
                expect(item.textContent).toBe("18,0004,0001+");
            }
        });
    },
};

export const Search: Story = {
    name: "Remote Search 远程搜索",
    render() {
        const res = resource(
            async () =>
                Mock.mock<{ data: SelectOptionsType[] }>({
                    "data|10": [
                        {
                            value: "@name",
                            label: "@cname",
                        },
                    ],
                }).data,
            { initValue: [] },
        );
        const data = atom([]);
        return (
            <div class="flex flex-col gap-4">
                <Select v-model={data} options={res()} />
                {data()}
            </div>
        );
    },
    args: {},
};

export const Virtual: Story = {
    name: "Virtual 虚拟化",
    render() {
        const options = genArray(1000).map((i) => {
            return {
                value: `jack${i}`,
                label: `Jack${i}`,
            };
        });
        const selected = atom([]);
        return (
            <div class="flex gap-4">
                <Select
                    v-model={selected}
                    aria-label="virtualSelect"
                    filterable
                    multiple
                    options={options}
                />

                <span data-testid="result">{selected().join("")}</span>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        await step("虚拟初始化数据判断", async () => {
            await userEvent.click(canvas.getByLabelText("virtualSelect"));
            const tooltip = within(canvas.getByRole("tooltip"));
            expect(tooltip.getByText("Jack1")).toBeInTheDocument();
            expect(tooltip.getByText("Jack2")).toBeInTheDocument();
            expect(tooltip.getByText("Jack3")).toBeInTheDocument();
            expect(tooltip.queryByText("Jack100")).toBeFalsy();
            expect(tooltip.queryByText("Jack200")).toBeFalsy();
            expect(tooltip.queryByText("Jack500")).toBeFalsy();
            expect(tooltip.queryByText("Jack700")).toBeFalsy();
            expect(tooltip.queryByText("Jack900")).toBeFalsy();
        });
        await step("滚动并依次选中", async () => {
            await userEvent.click(canvas.getByLabelText("virtualSelect"));
            const tooltip = within(canvas.getByRole("tooltip"));
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                async (scrollElement, context) => {
                    const item = canvas.queryByText("Jack500");
                    for (const i of scrollElement.children[0].children) {
                        if (
                            ["Jack1", "Jack2", "Jack3", "Jack100"].includes(
                                i.textContent!,
                            ) &&
                            i.getAttribute("aria-selected") !== "true"
                        )
                            await userEvent.click(i);
                        if (item) return true;
                    }
                },
                { step: 1000, maxScrollTime: 10000 },
            );

            expect(tooltip.queryByText("Jack1")).toBeFalsy();
            expect(tooltip.queryByText("Jack2")).toBeFalsy();
            expect(tooltip.queryByText("Jack3")).toBeFalsy();
            expect(tooltip.queryByText("Jack100")).toBeFalsy();
            expect(tooltip.queryByText("Jack200")).toBeFalsy();
            expect(tooltip.queryByText("Jack500")).toBeInTheDocument();
            expect(tooltip.queryByText("Jack700")).toBeFalsy();
            expect(tooltip.queryByText("Jack999")).toBeFalsy();
            await userEvent.click(tooltip.getByText("Jack500"))
            expect(canvas.getByTestId("result")).toHaveTextContent("jack1jack2jack3jack100jack500");
        });
        await step("滚动到底部", async () => {
            await userEvent.click(canvas.getByLabelText("virtualSelect"));
            const tooltip = within(canvas.getByRole("tooltip"));
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                async (scrollElement, context) => {
                    const item = tooltip.queryByText("Jack999");
                    if (item && (await isElementRealVisible(item))) {
                        return true;
                    }
                },
                { step: 40000 },
            );

            expect(tooltip.queryByText("Jack999")).not.toBeFalsy();
            expect(tooltip.queryByText("Jack998")).not.toBeFalsy();
        });
    },
};
