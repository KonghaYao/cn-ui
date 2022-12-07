import { atom, Atom } from '@cn-ui/use/src/atom';
import { reflect } from '@cn-ui/use/src/atom';
import { resource } from '@cn-ui/use/src/resource';
import { createEffect, createSignal } from 'solid-js';

/** 逐页查询组件 */
export const usePagination = <T>(
    getData: (pageNumber: number, maxPage: Atom<number>) => Promise<T>
) => {
    const currentIndex = atom<number>(0);
    const maxPage = atom<number>(10);
    const currentData = resource<T>(() => getData(currentIndex(), maxPage));

    createEffect(() => console.log(currentIndex()));
    // 更新数据
    const goto = (index: number) => {
        if (index < 0 || index >= maxPage()) {
            return false;
        } else {
            currentIndex(index);
            return currentData.refetch();
        }
    };
    return {
        /** index 数值，从 0 开始 */
        currentIndex,
        /** 页数 数值，从 1 开始 */
        currentPage: reflect(() => currentIndex() + 1),
        /** 类似于数组的 length ，表示页数 */
        maxPage,
        prev() {
            return goto(currentIndex() - 1);
        },
        next() {
            return goto(currentIndex() + 1);
        },
        goto,
        currentData,
    };
};
