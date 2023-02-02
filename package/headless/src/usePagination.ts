import { atom, Atom } from '@cn-ui/use';
import { reflect } from '@cn-ui/use';
import { resource } from '@cn-ui/use';
/** 逐页查询组件，但是是滑动加载的那种，不会清除上次数据
 * @test
 */
export const usePaginationStack = <T>(
    getData: (pageNumber: number, maxPage: Atom<number>) => Promise<T>,
    init: {
        initIndex?: number;
        immediatelyRequest?: boolean;
    } = {}
) => {
    const dataSlices = atom<T[]>([], { equals: false });
    return {
        ...usePagination(async (...args) => {
            const data = await getData(...args);
            dataSlices((i) => {
                i[args[0]] = data;
                return i;
            });
            return data;
        }, init),
        dataSlices,
    };
};

/** 逐页查询组件 */
export const usePagination = <T>(
    getData: (pageNumber: number, maxPage: Atom<number>) => Promise<T>,
    init: {
        initIndex?: number;
        immediatelyRequest?: boolean;
    } = {}
) => {
    const currentIndex = atom<number>(init.initIndex ?? 0);
    const maxPage = atom<number>(10);
    const currentData = resource<T>(
        () => getData(currentIndex(), maxPage),
        null,
        init.immediatelyRequest ?? true
    );

    // createEffect(() => console.log(currentIndex()));
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
