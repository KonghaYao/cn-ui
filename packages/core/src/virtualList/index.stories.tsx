import { ArrayFolder, atom, sleep } from "@cn-ui/reactive";
import { isElementRealVisible, scrollElement } from "@cn-ui/reactive";
import { expect, within } from "@storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs";

import Mock from "mockjs-ts";
import { VirtualList } from "./VirtualList";
const meta = {
    title: "Data 数据展示/VirtualList 虚拟列表",
    component: VirtualList,
} satisfies Meta<typeof VirtualList>;

export default meta;
export type Story = StoryObj<typeof meta>;

/**  */
export const Primary: Story = {
    name: "ListRender 列表渲染",
    render() {
        const cellsSize = 10 * 10000;
        const items = atom(ArrayFolder([...Array(cellsSize).keys()], 10));
        return (
            <div class="h-96 flex flex-col">
                <div class="h-24">10x10000</div>
                <VirtualList each={items()} estimateSize={24}>
                    {(item, index, { itemClass }) => {
                        return (
                            <div class="h-6 bg-gray-100 flex">
                                {item.map((i) => {
                                    return <div class="flex-1">{i}</div>;
                                })}
                            </div>
                        );
                    }}
                </VirtualList>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("滚动到最末尾", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                (scrollElement, context) => {
                    if (canvas.queryByText("99999")) {
                        return true;
                    }
                },
                { step: 20000 },
            );
            expect(await isElementRealVisible(canvas.getByText("99999"))).toBe(true);
            expect(await isElementRealVisible(canvas.getByText("99990"))).toBe(true);
        });
        await step("滚动到最前面", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                (scrollElement, context) => {
                    if (canvas.queryByText("0")) {
                        return true;
                    }
                },
                { step: -20000 },
            );
            // 判断 0 在视野中
            expect(await canvas.findByText("0")).toBeInTheDocument();
        });
        // feat: 内存检查
    },
};
export const DynamicHeight: Story = {
    name: "DynamicHeight 不等高测试",
    render() {
        const cellsSize = 1000;
        const items = atom(
            Mock.mock<{ data: string[] }>({ [`data|${cellsSize}`]: ["@paragraph"] }).data,
        );

        return (
            <div class="h-[80vh] flex flex-col">
                <div class="h-24">1000</div>
                <VirtualList
                    data-testid="v-list"
                    each={items()}
                    estimateSize={36}
                    expose={(expose) => {
                        (globalThis as any).expose = expose;
                    }}
                >
                    {(item, index) => {
                        return (
                            <div class=" bg-gray-100 flex py-4">
                                <mark data-testid="index">{index()}</mark>
                                {item}
                            </div>
                        );
                    }}
                </VirtualList>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step("判断视野内的行都是不等高的", async () => {
            const vList = [...canvasElement.querySelectorAll(".cn-virtual-item")];
            const heights = vList.map((i) => getComputedStyle(i).height);
            expect(heights.every((i, index, arr) => i !== arr[index + 1])).toBe(true);
        });
    },
};
export const horizontal: Story = {
    name: "Horizontal 横向测试",
    render() {
        const cellsSize = 1000;
        const items = atom(
            Mock.mock<{ data: string[] }>({ [`data|${cellsSize}`]: ["@paragraph"] }).data,
        );

        return (
            <div class="h-[80vh] flex flex-col">
                <div class="h-24">1000</div>
                <VirtualList
                    data-testid="v-list"
                    class="flex-1"
                    horizontal
                    each={items()}
                    estimateSize={36}
                    expose={(expose) => {
                        (globalThis as any).expose = expose;
                    }}
                >
                    {(item, index) => {
                        return (
                            <div
                                class="h-full  bg-gray-100 flex py-4"
                                style={{
                                    "writing-mode": "vertical-lr",
                                }}
                            >
                                <mark data-testid="index">{index()}</mark>
                                {item}
                            </div>
                        );
                    }}
                </VirtualList>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("滚动到最末尾", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                async (scrollElement, context) => {
                    const item = canvas.queryByText("999");
                    if (item && (await isElementRealVisible(item))) {
                        return true;
                    }
                },
                { step: 20000, horizontal: true },
            );
            expect(canvas.getByText("999")).toBeInTheDocument();
            expect(canvas.getByText("998")).toBeInTheDocument();
        });
        await step("滚动到最前面", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                (scrollElement, context) => {
                    if (canvas.queryByText("0")) {
                        return true;
                    }
                },
                { step: -20000, horizontal: true },
            );
            // 判断 0 在视野中
            expect(await canvas.findByText("0")).toBeInTheDocument();
        });
        // feat: 内存检查
    },
};
export const Reverse: Story = {
    name: "Reverse 反向渲染",
    render() {
        const cellsSize = 1000;
        const items = atom(
            Mock.mock<{ data: string[] }>({ [`data|${cellsSize}`]: ["@paragraph"] }).data,
        );

        return (
            <div class="h-[80vh] flex flex-col">
                <div class="h-24">1000</div>
                <VirtualList
                    data-testid="v-list"
                    class="flex-1"
                    reverse
                    each={items()}
                    estimateSize={36}
                    expose={(expose) => {
                        (globalThis as any).expose = expose;
                    }}
                >
                    {(item, index) => {
                        return (
                            <div class="w-full bg-gray-100 flex py-4">
                                <mark data-testid="index">{index()}</mark>
                                {item}
                            </div>
                        );
                    }}
                </VirtualList>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("从下往上滚动", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                async (scrollElement, context) => {
                    const item = canvas.queryByText("999");
                    if (item && (await isElementRealVisible(item))) {
                        return true;
                    }
                },
                { step: -20000 },
            );
            expect(await isElementRealVisible(canvas.getByText("999"))).toBe(true);
            expect(await isElementRealVisible(canvas.getByText("998"))).toBe(true);
        });
        await step("从上往下滚动", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                (scrollElement, context) => {
                    if (canvas.queryByText("0")) {
                        return true;
                    }
                },
                { step: 20000 },
            );
            // 判断 0 在视野中
            expect(await canvas.findByText("0")).toBeInTheDocument();
        });

        // feat: 内存检查
    },
};
export const H_Reverse: Story = {
    name: "H_Reverse 横向反向测试",
    render() {
        const cellsSize = 1000;
        const items = atom(
            Mock.mock<{ data: string[] }>({ [`data|${cellsSize}`]: ["@sentence"] }).data,
        );

        return (
            <div class="h-[80vh] flex flex-col">
                <div class="h-24">1000</div>
                <VirtualList
                    data-testid="v-list"
                    class="flex-1 h-96"
                    reverse
                    horizontal
                    each={items()}
                    estimateSize={36}
                    expose={(expose) => {
                        (globalThis as any).expose = expose;
                    }}
                    onVirtualScrollEnd={() => console.log("end")}
                >
                    {(item, index) => {
                        return (
                            <div
                                class="h-full bg-gray-100 flex py-4"
                                style={{
                                    "writing-mode": "vertical-rl",
                                }}
                            >
                                <mark data-testid="index">{index()}</mark>
                                {item}
                            </div>
                        );
                    }}
                </VirtualList>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("滚动到最末尾", async () => {
            expect(canvas.getByText("0")).toBeInTheDocument();
            expect(canvas.getByText("1")).toBeInTheDocument();
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                async (scrollElement, context) => {
                    const item = canvas.queryByText("999");
                    if (item) {
                        return true;
                    }
                },
                { step: -20000, horizontal: true },
            );
            expect(canvas.getByText("999")).toBeInTheDocument();
            expect(canvas.getByText("998")).toBeInTheDocument();
        });
        await step("滚动到最前面", async () => {
            await scrollElement(
                canvasElement.querySelector(".cn-virtual-list")!,
                (scrollElement, context) => {
                    if (canvas.queryByText("0")) {
                        return true;
                    }
                },
                { step: 20000, horizontal: true },
            );
            // 判断 0 在视野中
            expect(await canvas.findByText("0")).toBeInTheDocument();
        });
        // feat: 内存检查
    },
};
