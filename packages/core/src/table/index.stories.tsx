import { genArray, isElementRealVisible, scrollElement, sleep } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import type { Meta, StoryObj } from "storybook-solidjs";
import { registerAllControlComponent } from "../register";
import { ColumnGroups } from "./example/ColumnGroups";
import { ColumnOrdering } from "./example/ColumnOrdering";
import { ColumnPinned } from "./example/ColumnPinned";
import { makeVirtualColumns, makeVirtualData } from "./example/DataMaker";
import { DefaultSelection } from "./example/DefaultSelection";
import { Expanded } from "./example/Expanded";
import { FormTable } from "./example/FormTable";
import { PaginationExample } from "./example/Pagination";
import { MagicTable, useTableVirtual } from "./index";

registerAllControlComponent();

const meta = {
    title: "Data 数据展示/Table 表格组件",
    component: MagicTable,
    argTypes: {},
} satisfies Meta<typeof MagicTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    name: "1000x1000",
    decorators: [
        (Story) => (
            <>
                <div class="p-12 overflow-hidden h-full">
                    <div class="overflow-auto h-full">
                        <Story />
                    </div>
                </div>
                <style>
                    {`html,body,#storybook-root {
                height:100%
            }`}
                </style>
            </>
        ),
    ],
    render() {
        console.time("createData");
        const cols = makeVirtualColumns(1000);
        const data = makeVirtualData(
            1000,
            genArray(1000).map((i) => i.toString()),
        );
        console.timeEnd("createData");
        return <MagicTable virtual={useTableVirtual} columns={cols} data={data} />;
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("滚动到最末尾", async () => {
            await scrollElement(
                canvas.getByRole("table"),
                (scrollElement, context) => {
                    if (canvas.queryByText("999-0")) {
                        return true;
                    }
                },
                { step: 20000 },
            );
            expect(canvas.getByText("999-0")).toBeInTheDocument();
            expect(canvas.getByText("999-1")).toBeInTheDocument();
        });

        await step("滚动到最右下角", async () => {
            await scrollElement(
                canvas.getByRole("table"),
                (scrollElement, context) => {
                    if (canvas.queryByText("999-999")) {
                        return true;
                    }
                },
                { step: 20000, horizontal: true },
            );
            expect(await canvas.findByText("999-999")).toBeInTheDocument();
        });
        await step("滚动到最右上角", async () => {
            await scrollElement(
                canvas.getByRole("table"),
                (scrollElement, context) => {
                    if (canvas.queryByText("0-999")) {
                        return true;
                    }
                },
                { step: -20000 },
            );
            expect(await canvas.findByText("0-999")).toBeInTheDocument();
            expect(await canvas.findByText("0-998")).toBeInTheDocument();
        });
        await step("滚动到最右上角", async () => {
            await scrollElement(
                canvas.getByRole("table"),
                (scrollElement, context) => {
                    if (canvas.queryByText("0-0")) {
                        return true;
                    }
                },
                { step: -20000, horizontal: true },
            );
            expect(await canvas.findByText("0-0")).toBeInTheDocument();
            expect(await canvas.findByText("0-1")).toBeInTheDocument();
        });
        // feat: 内存检查
    },
};
export const Selection: Story = {
    name: "Selection and Index",
    decorators: Primary.decorators,
    render: DefaultSelection,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        await step("检查选中状态", async () => {
            await userEvent.click(canvas.getByLabelText("Select Row 1"));
            expect(canvas.getByLabelText("Unselect Row 1")).toBeInTheDocument();
            await userEvent.click(canvas.getByLabelText("Unselect Row 1"));
            expect(canvas.getByLabelText("Select Row 1")).toBeInTheDocument();
        });
        await step("检查全选状态", async () => {
            await userEvent.click(canvas.getByLabelText("Select All Rows"));
            expect(canvas.getByLabelText("Unselect Row 1")).toBeInTheDocument();

            await scrollElement(
                canvas.getByRole("table"),
                (scrollElement, context) => {
                    if (canvas.queryByText("100")) {
                        return true;
                    }
                },
                { step: 20000 },
            );

            expect(canvas.getByLabelText("Unselect Row 100")).toBeInTheDocument();

            await userEvent.click(canvas.getByLabelText("Select All Rows"));
            expect(canvas.getByLabelText("Select Row 100")).toBeInTheDocument();
        });
        // 未强制检查索引列
    },
};
export const Expanding: Story = {
    name: "Expanding 展开行",
    decorators: Primary.decorators,
    render: Expanded,
    args: {},
};
export const ColumnPinned_: Story = {
    name: "ColumnPinned 固定列",
    decorators: Primary.decorators,
    render: ColumnPinned,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
        // 从左到右，依然能够看到列
        await step("检查固定列", async () => {
            const items = ["0-0", "1-0", "3-0", "2-0", "4-0"].map((i) =>
                within(canvasElement.querySelector('[data-index="0"]')!).getByText(i),
            );
            const target = canvas.queryByText("49-0")!;
            await scrollElement(
                canvas.getByRole("table").parentElement!,
                async (scrollElement, context) => {
                    items.forEach((item) => {
                        expect(item).toBeInTheDocument();
                    });
                    if (await isElementRealVisible(target)) {
                        return true;
                    }
                },
                { step: 2000, horizontal: true },
            );
        });
    },
};

export const ColumnGroup: Story = {
    name: "ColumnGroup 多级表头",
    decorators: Primary.decorators,
    render: ColumnGroups,
    parameters: {
        virtualTest: true,
    },
};
export const _ColumnOrdering: Story = {
    name: "ColumnOrdering 列排序",
    decorators: Primary.decorators,
    render: ColumnOrdering,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await sleep(100);
    },
};
export const _Pagination: Story = {
    name: "Pagination 分页",
    decorators: Primary.decorators,
    render: PaginationExample,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const allAgeCells = () =>
            [...canvas.getByRole("table").querySelectorAll("tr[data-index]")].map((i) => {
                return Number.parseInt(i.children[2].textContent!);
            });
        await step("检查排序功能", async () => {
            console.log(allAgeCells());
            // 检测初始状态，非递增，非递减
            const initState = allAgeCells();
            expect(initState.every((i, index, arr) => index === 0 || i > arr[index - 1])).toBe(
                false,
            );
            expect(initState.every((i, index, arr) => index === 0 || i < arr[index - 1])).toBe(
                false,
            );
            await userEvent.click(canvas.getByText("Age").parentElement!.children[2]);
            // 检测 allAgeCells 递减
            expect(allAgeCells().every((i, index, arr) => index === 0 || i < arr[index - 1])).toBe(
                true,
            );
            await userEvent.click(canvas.getByText("Age").parentElement!.children[2]);
            // 检测 allAgeCells 递增
            expect(allAgeCells().every((i, index, arr) => index === 0 || i > arr[index - 1])).toBe(
                true,
            );
            await userEvent.click(canvas.getByText("Age").parentElement!.children[2]);
            expect(allAgeCells()).toEqual(initState);
        });
        await step("检查分页功能", async () => {
            await userEvent.click(canvas.getByText("Age").parentElement!.children[2]);
            await userEvent.click(canvas.getByText("Age").parentElement!.children[2]);
            const initState = allAgeCells();
            await userEvent.click(canvas.getByLabelText("next page"));
            await sleep(100);
            expect(allAgeCells().map((i) => i - 100)).toEqual(initState);
        });
    },
};
export const _Form: Story = {
    name: "Form 可编辑表格",
    decorators: Primary.decorators,
    render: FormTable,
    args: {},
};
