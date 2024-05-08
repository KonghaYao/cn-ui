import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, genArray, usePagination } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { Pagination } from "./index";

const meta = {
    title: "Navigation 导航/Pagination 分页",
    component: Pagination,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        const a = usePagination(async (num, max, count) => {
            console.log("请求", num);
            max(100);
            count(200);
            return [];
        });
        const pageSize = atom(10);
        return (
            <>
                <div>total:{a.count()}</div>
                <div>page: {a.currentPage()}</div>
                <div>pageSize: {pageSize()}</div>
                <Pagination
                    {...a.toPaginationModel()}
                    pageSizeModel={pageSize}
                    pageSize={pageSize()}
                />
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step("检查 page 同步", async () => {
            expect(canvas.getByText("page: 1")).toBeInTheDocument();
            await userEvent.click(canvas.getByLabelText("page 2"));
            expect(canvas.getByText("page: 2")).toBeInTheDocument();
            expect(canvas.getByLabelText("page 2")).toBeDisabled();

            await userEvent.click(canvas.getByLabelText("next page"));
            expect(canvas.getByText("page: 3")).toBeInTheDocument();
            expect(canvas.getByLabelText("page 3")).toBeDisabled();

            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            await userEvent.click(canvas.getByLabelText("next page"));
            expect(canvas.getByLabelText("page 10")).toBeDisabled();
            await Promise.all(
                genArray(10).map((i) => {
                    return userEvent.click(canvas.getByLabelText("next page"));
                }),
            );
            expect(canvas.getByLabelText("page 20")).toBeDisabled();
        });
    },
};
