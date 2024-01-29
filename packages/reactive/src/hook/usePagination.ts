import { sleep } from '../utils'
import { type Atom, atom, resource, ResourceOptions, reflectMemo, computed } from '../atom/index'
import { debounce } from 'lodash-es'
export type PaginationOptions<T> = ResourceOptions<T> & {
    initIndex?: number
    debounceTime?: number
}

/**
 * @zh 逐页查询组件, 内部采用了时间过滤
 *  */
export const usePagination = <T>(getData: (pageIndex: number, maxPage: Atom<number>, count: Atom<number>) => Promise<T>, init: PaginationOptions<T> = {}) => {
    init.debounceTime = init.debounceTime ?? 100

    const currentIndex = atom(init.initIndex ?? 0)
    const maxPage = atom(10)
    const count = atom(10)
    const currentData = resource<T>(() => getData(currentIndex(), maxPage, count), init)

    const refetchImmediate = () => currentData.refetch()
    const refetch = debounce(refetchImmediate, init.debounceTime!)
    // 更新数据
    const goto = (index: number, immediate = false) => {
        if (index < 0 || index >= maxPage()) {
            return false
        } else {
            currentIndex(index)
            //! 页码改变如果迅速的话，那应该不进行请求，而是直接忽略
            return immediate ? refetchImmediate() : refetch()
        }
    }
    const currentPageModel = currentIndex.reflux(currentIndex() + 1, (self) => self - 1)
    return {
        count,
        /** index 数值，从 0 开始 */
        currentIndex,
        /** 页数 数值，从 1 开始 */
        currentPage: createMemo(() => currentIndex() + 1),
        /** 类似于数组的 length ，表示页数 */
        maxPage,
        prev() {
            return goto(currentIndex() - 1)
        },
        next() {
            return goto(currentIndex() + 1)
        },
        /**
         * @zh 保证在下一次请求完成后，promise 结束,如果结束了，那么就稍等 debounceTime 再返回，测试用途较多
         */
        async waitForDone() {
            return sleep(init.debounceTime! + 10).then(currentData.promise)
        },
        /** 重新异步获取 */
        refetch,
        refetchImmediate,
        goto,
        currentData,
        /** 转化成 Pagination 组件使用的模式 */
        toPaginationModel() {
            return {
                'v-model': currentPageModel,
                count: count(),
                onPageChange: refetch
            }
        }
    }
}

import { batch, createMemo } from 'solid-js'

/**
 * 滑动加载逐页查询组件，也可称无限加载逻辑组件
 * @test
 */
export const usePaginationStack = <T>(getData: (pageNumber: number, maxPage: Atom<number>, count: Atom<number>) => Promise<T>, init: PaginationOptions<T>) => {
    const dataSlices = atom<T[]>([], { equals: false })
    const p = usePagination(async (...args) => {
        const data = await getData(...args)
        dataSlices((i) => {
            i[args[0]] = data
            return i
        })
        return data
    }, init)
    return {
        ...p,
        /** 重置加载 */
        resetStack(
            /** 立即重新加载 */
            refetch = true
        ) {
            batch(() => {
                dataSlices([])
                p.currentIndex(0)
                refetch && p.currentData.refetch()
            })
        },
        /** 这个才是需要渲染的最终数据 */
        dataSlices
    }
}
