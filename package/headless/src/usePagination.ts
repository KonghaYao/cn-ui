import { atom, Atom } from '@cn-ui/use';
import { usePagination } from '@cn-ui/use';

/**
 * 逐页查询组件，但是是滑动加载的那种，不会清除上次数据
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
export { usePagination };
