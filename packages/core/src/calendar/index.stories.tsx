import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, dayjs, sleep } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { Flex } from "../container";
import { Calendar } from "./index";

const meta = {
    title: "Controls/Calendar 日历",
    component: Calendar,
    argTypes: {},
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: "日历面板",
    render() {
        const date = atom([dayjs("2024-04-15")]);
        const month = atom([dayjs("2024-04-15")]);
        const year = atom([dayjs("2024-04-15")]);
        return (
            <Flex gap="20px">
                <Calendar locales={"zh-Hans-CN"} data-testid="single" v-model={date} />
                <Calendar
                    locales={"zh-Hans-CN"}
                    data-testid="multiple"
                    v-model={month}
                    mode="multiple"
                />
                <Calendar locales={"zh-Hans-CN"} data-testid="range" v-model={year} mode="range" />
            </Flex>
        );
    },
    play: async ({ canvasElement, step }) => {
        const single = within(within(canvasElement).getByTestId("single"));
        const multiple = within(within(canvasElement).getByTestId("multiple"));
        const range = within(within(canvasElement).getByTestId("range"));

        const getSelected = (part: string) => [
            ...within(canvasElement).getByTestId(part).querySelectorAll('[aria-selected="true"]'),
        ];
        await step("初始状态检测", async () => {
            for (const page of [single, multiple, range]) {
                // 15 的状态被选中
                await expect(page.getByLabelText("2024 04 15")).toHaveClass("cn-selected");

                // 日  一 二 三 四 五 六 在页面中
                const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
                for (const weekday of weekdays) {
                    await expect(page.getByText(weekday)).toBeInTheDocument();
                }

                // 页面中有两个 1 2 3 4
                const numbers = ["1", "2", "3"];
                for (const num of numbers) {
                    const elements = page.getAllByText(num);
                    await expect(elements.length).toBe(2);
                }
            }
        });
        await step("选取下一个月的日期，将会跳入下一月", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByLabelText("2024 05 01"));
                expect(page.getByLabelText("5月 点击进入月面板")).toHaveTextContent("5");
                await userEvent.click(page.getByLabelText("2024 04 30"));
                expect(page.getByLabelText("4月 点击进入月面板")).toHaveTextContent("4");
                await userEvent.click(page.getByLabelText("2024 04 15"));
            }
        });
        await step("左右月跳转测试", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByLabelText("上一月"));
                expect(page.getByLabelText("3月 点击进入月面板")).toHaveTextContent("3");
                await userEvent.click(page.getByLabelText("上一年"));
                expect(page.getByLabelText("2023年 点击进入年面板")).toHaveTextContent("2023");
                await userEvent.click(page.getByLabelText("下一年"));
                expect(page.getByLabelText("2024年 点击进入年面板")).toHaveTextContent("2024");

                await userEvent.click(page.getByLabelText("下一月"));
                expect(page.getByLabelText("4月 点击进入月面板")).toHaveTextContent("4");
            }
        });

        await step("多选时间测试", async () => {
            for (const page of [multiple]) {
                await userEvent.click(page.getByLabelText("2024 04 14"));
                await userEvent.click(page.getByLabelText("2024 04 16"));
                await userEvent.click(page.getByLabelText("2024 04 17"));
                await userEvent.click(page.getByLabelText("2024 04 18"));
                await userEvent.click(page.getByLabelText("2024 04 30"));
                await expect(
                    getSelected("multiple").map((i) => {
                        return i.textContent;
                    }),
                ).toEqual(["14", "16", "17", "18", "1"]);
            }
        });

        await step("区间选取时间测试", async () => {
            for (const page of [range]) {
                await userEvent.click(page.getByLabelText("2024 04 18"));
                await expect(
                    getSelected("range").map((i) => {
                        return i.textContent;
                    }),
                ).toEqual(["15", "16", "17", "18"]);
            }
        });
        await step("已有区间，点击另外节点清空区间并选中", async () => {
            for (const page of [range]) {
                await userEvent.click(page.getByLabelText("2024 04 01"));
                await sleep(100);
                await expect(
                    getSelected("range").map((i) => {
                        return i.textContent;
                    }),
                ).toEqual([]);
                await userEvent.click(page.getByLabelText("2024 04 02"));
                await expect(
                    getSelected("range").map((i) => {
                        return i.textContent;
                    }),
                ).toEqual(["1", "2"]);
            }
        });
    },
};
export const DateTest: Story = {
    name: "日期面板，跳转测试",
    render: Primary.render,
    play: async ({ canvasElement, step }) => {
        const single = within(within(canvasElement).getByTestId("single"));
        const multiple = within(within(canvasElement).getByTestId("multiple"));
        const range = within(within(canvasElement).getByTestId("range"));

        const getSelected = (part: string) => [
            ...within(canvasElement).getByTestId(part).querySelectorAll('[aria-selected="true"]'),
        ];

        await step("进入2024年面板", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByText("2024"));
                await expect(page.queryByLabelText("2025")).toBeInTheDocument();

                await expect(page.queryByLabelText("上一月")).toBeFalsy();
                await expect(page.queryByLabelText("下一月")).toBeFalsy();
                if (page !== range)
                    await expect(page.getByLabelText("2024")).toHaveAttribute(
                        "aria-selected",
                        "true",
                    );
            }
        });
        await step("进入2023年的月面板", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByLabelText("2023"));
                await expect(page.queryByLabelText("上一月")).toBeFalsy();
                await expect(page.queryByLabelText("下一月")).toBeFalsy();
                // 所有 button 未选中
                for (const el of page.queryAllByRole("button")) {
                    await expect(el).not.toHaveAttribute("aria-selected", "true");
                }
            }
        });
        await step("进入2023 4年的日历面板", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByLabelText("2023 04"));
                await expect(page.queryByLabelText("上一月")).toBeInTheDocument();
                await expect(page.queryByLabelText("下一月")).toBeInTheDocument();
                await userEvent.click(page.getByLabelText("2023 04 21"));
                if (page === range) {
                    await expect(getSelected("range").map((i) => i.textContent)).toEqual([
                        "21",
                        "22",
                        "23",
                        "24",
                        "25",
                        "26",
                        "27",
                        "28",
                        "29",
                        "30",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                    ]);
                }
            }
        });
        await step("进入2024年面板, 回查选中", async () => {
            for (const page of [single, multiple, range]) {
                await userEvent.click(page.getByText("2023"));
                expect(page.getByLabelText("2023")).toHaveAttribute("aria-selected", "true");
                if (page !== single) {
                    expect(page.getByLabelText("2024")).toHaveAttribute("aria-selected", "true");
                }
            }
        });
    },
};
export const Second: Story = {
    name: "月份面板",
    render() {
        const date = atom([dayjs("2024-04-15")]);
        return (
            <Flex gap="20px">
                <Calendar locales={"zh-Hans-CN"} v-model={date} view="month" />
                <Calendar locales={"zh-Hans-CN"} v-model={date} view="month" mode="multiple" />
                <Calendar locales={"zh-Hans-CN"} v-model={date} view="month" mode="range" />
            </Flex>
        );
    },
    args: {},
};
export const Year: Story = {
    name: "年份面板",
    render() {
        const date = atom([dayjs("2024-04-15")]);
        return (
            <Flex gap="20px">
                <Calendar v-model={date} locales={"zh-Hans-CN"} view="year" />
                <Calendar v-model={date} locales={"zh-Hans-CN"} view="year" mode="multiple" />
                <Calendar v-model={date} locales={"zh-Hans-CN"} view="year" mode="range" />
            </Flex>
        );
    },
    args: {},
};
