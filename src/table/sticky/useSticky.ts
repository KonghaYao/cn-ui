import { atom, computed } from '@cn-ui/reactive'
import { MagicColumnConfig } from '../'
import { Accessor } from 'solid-js'
import { defaultRangeExtractor, Range } from '@tanstack/solid-virtual'

export const useSticky = <T>(columns: Accessor<MagicColumnConfig<T>[]>) => {
    const allSticky = computed(
        () =>
            new Set(
                columns().flatMap((i, index) => {
                    if (i.sticky) {
                        return [index]
                    } else {
                        return []
                    }
                })
            )
    )
    const stickingItems = atom<number[]>([])
    const isStickying = (index: number) => stickingItems().includes(index)
    const isCanSticky = (index: number) => allSticky().has(index)
    const getStickingIndex = (index: number) => stickingItems().findIndex((i) => i === index)
    return {
        stickingItems,
        isStickying,
        isCanSticky,
        getStickingIndex,
        /**
         * 给内部虚拟化列的配置,
         * @private
         */
        rangeExtractor: (range: Range) => {
            const sideLine = range.startIndex + stickingItems().length
            if (range.startIndex !== 0) {
                const stickingRows = [...allSticky()].filter((index) => sideLine > index)
                stickingItems(() => stickingRows)
            } else {
                stickingItems([])
            }
            return [...stickingItems(), ...defaultRangeExtractor(range)]
        }
    }
}
