import { sleep } from '../utils';
import {
    type Atom,
    atom,
    resource,
    reflect,
    ResourceOptions,
    reflectMemo,
    RefetchOption,
} from '../atom/index';
import { debounce } from 'lodash-es';
/**
 * @zh 逐页查询组件, 内部采用了时间过滤
 *  */
export const usePagination = <T>(
    getData: (pageNumber: number, maxPage: Atom<number>) => Promise<T>,
    init: ResourceOptions<T> & {
        initIndex?: number;
        debounceTime?: number;
        refetch?: RefetchOption;
    } = {}
) => {
    init.debounceTime = init.debounceTime ?? 100;
    // init.refetch = init.refetch ?? { warn: true };

    const currentIndex = atom<number>(init.initIndex ?? 0);
    const maxPage = atom<number>(10);
    const currentData = resource<T>(() => getData(currentIndex(), maxPage), init);

    const update = debounce(() => currentData.refetch(init.refetch), init.debounceTime!);

    // 更新数据
    const goto = (index: number) => {
        if (index < 0 || index >= maxPage()) {
            return false;
        } else {
            currentIndex(index);
            // 需要在这里 debounce 而不是数字改变，页码改变如果迅速的话，那应该不进行请求，而是直接忽略
            return update();
        }
    };
    return {
        /** index 数值，从 0 开始 */
        currentIndex,
        /** 页数 数值，从 1 开始 */
        currentPage: reflectMemo(() => currentIndex() + 1),
        /** 类似于数组的 length ，表示页数 */
        maxPage,
        prev() {
            return goto(currentIndex() - 1);
        },
        next() {
            return goto(currentIndex() + 1);
        },
        /**
         * @zh 保证在下一次请求完成后，promise 结束,如果结束了，那么就稍等 debounceTime 再返回
         *
         *  */
        async waitForDone() {
            return sleep(init.debounceTime! + 10).then(currentData.promise);
        },
        updater: update,
        goto,
        currentData,
    };
};
