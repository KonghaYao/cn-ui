import { atom, Atom } from './atom';
import { resource } from './resource';

/** 逐页查询组件 */
export const usePagination = <T>(
    getData: (pageNumber: number, maxPage: Atom<number>) => Promise<T>
) => {
    const currentIndex = atom<number>(0);
    const maxPage = atom<number>(10);
    const currentData = resource<T>(() => getData(currentIndex(), maxPage));

    // 更新数据

    return {
        currentIndex,
        maxPage,
        prev() {
            if (currentIndex() <= 0) {
                currentIndex(0);
                return false;
            } else {
                currentIndex((i) => i - 1);
                return currentData.refetch();
            }
        },
        next() {
            if (currentIndex() >= maxPage()) {
                currentIndex(maxPage());
                return false;
            } else {
                currentIndex((i) => i + 1);
                return currentData.refetch();
            }
        },
        goto(index: number) {
            if (index < 0 || index > maxPage()) {
                return false;
            } else {
                currentIndex(index);
                return currentData.refetch();
            }
        },
        currentData,
    };
};
