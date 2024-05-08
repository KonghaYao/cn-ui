import type { Meta, StoryObj } from "storybook-solidjs";

import { atom, usePagination } from "@cn-ui/reactive";
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
                <div>
                    total:{a.count()}
                    page: {a.currentPage()}
                    pageSize: {pageSize()}
                </div>
                <Pagination
                    {...a.toPaginationModel()}
                    pageSizeModel={pageSize}
                    pageSize={pageSize()}
                />
            </>
        );
    },
    args: {},
};
