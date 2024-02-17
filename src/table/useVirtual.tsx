import { Table } from '@tanstack/solid-table'
import { Atom } from '@cn-ui/reactive'
import { createVirtualizer } from './virtual/createVirtualizer'
import { Accessor, createMemo } from 'solid-js'
import { useSticky } from './sticky/useSticky'
import { MagicColumnConfig } from '.'
import { Virtualizer } from '@tanstack/solid-virtual'

export function useVirtual<T>(
    table: Table<T>,
    tableContainerRef: Atom<HTMLDivElement | null>,
    data: { composedColumns: Accessor<MagicColumnConfig<T>[]>; estimateHeight: Accessor<number | undefined> }
) {
    // 构建固定列
    const sticky = useSticky(table)
    const columnVirtualizer = createVirtualizer({
        get count() {
            const count = table.getCenterLeafColumns().length
            console.log(count)
            return count
        },
        estimateSize(index) {
            // TODO
            return 200
        },
        // average column width in pixels
        getScrollElement: () => tableContainerRef(),
        rangeExtractor: sticky.rangeExtractor,
        horizontal: true,
        overscan: 12
    })

    // 添加初始化 sticky 特性
    table.getLeafHeaders().forEach((i) => {
        /** @ts-ignore */
        i.column.columnDef.sticky && i.column.pin('left')
    })
    //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
    const rowVirtualizer = createVirtualizer({
        get count() {
            return table.getCenterRows().length
        },
        estimateSize: () => data.estimateHeight() ?? 48, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef(),
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 12
    })
    const rows = createMemo(() => table.getSortedRowModel().rows)
    const colVirtualPadding = createMemo(createPadding(columnVirtualizer as any))
    const rowVirtualPadding = createMemo(createPadding(rowVirtualizer as any))
    return {
        rowVirtualizer,
        columnVirtualizer,
        colVirtualPadding,
        rowVirtualPadding,
        rows
    }
}

const createPadding = (virtualizer: Virtualizer<HTMLDivElement, Element>) => {
    return () => {
        const items = virtualizer.getVirtualItems()
        //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
        let virtualPaddingLeft: number | undefined
        let virtualPaddingRight: number | undefined

        if (virtualizer && items?.length) {
            virtualPaddingLeft = items[0]?.start ?? 0
            virtualPaddingRight = virtualizer.getTotalSize() - (items[items.length - 1]?.end ?? 0)
        }
        return { start: virtualPaddingLeft ?? 0, end: virtualPaddingRight ?? 0 }
    }
}
