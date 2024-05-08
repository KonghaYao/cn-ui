import { range } from "radash";
import { batch, createMemo } from "solid-js";
import { type UseOffsetPaginationOptions, useOffsetPagination } from "solidjs-use";

export interface UseViewingPaginationOptions extends UseOffsetPaginationOptions {
    /**
     * 旁边可视范围内的按钮数量
     * @default 5
     */
    siblingCount?: number;
}
export const useViewingPagination = (options: UseViewingPaginationOptions) => {
    const pageControl = useOffsetPagination(options);
    /**
     * 视野范围内看到的序号数组
     */
    const viewingPages = createMemo(() => {
        const siblingCount = options.siblingCount ?? 5;
        const currentPage = pageControl.currentPage();

        let max = currentPage + siblingCount;
        let min = currentPage - siblingCount;
        if (min < 1) {
            max += 1 - min;
        } else if (max > pageControl.pageCount()) {
            min -= max - pageControl.pageCount();
        }
        max = Math.min(pageControl.pageCount(), max);
        min = Math.max(1, min);

        return [...range(min, max)];
    });
    /**
     * 判断是否为当前页
     * @param page
     * @returns boolean
     */
    const isCurrentPage = (page: number) => {
        return pageControl.currentPage() === page;
    };
    return {
        isCurrentPage,
        viewingPages,
        ...pageControl,
    };
};
