import { Table } from '@tanstack/solid-table'
import { Atom } from '@cn-ui/reactive'
import { createVirtualizer } from './virtual/createVirtualizer'
import { Accessor } from 'solid-js'
import { useSticky } from './sticky/useSticky'
import { MagicColumnConfig } from '.'

export function useVirtual<T>(
    table: Table<T>,
    tableContainerRef: Atom<HTMLDivElement | null>,
    data: { composedColumns: Accessor<MagicColumnConfig<T>[]>; estimateHeight: Accessor<number | undefined> }
) {
    // 构建固定列
    const sticky = useSticky(data.composedColumns)
    const columnVirtualizer = createVirtualizer({
        get count() {
            return data.composedColumns().length
        },
        estimateSize(index) {
            return data.composedColumns()[index].size ?? 100
        }, //average column width in pixels
        getScrollElement: () => tableContainerRef(),
        rangeExtractor: sticky.rangeExtractor,
        horizontal: true,
        overscan: 12
    })
    //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
    const rowVirtualizer = createVirtualizer({
        get count() {
            return table.getRowModel().rows.length
        },
        estimateSize: () => data.estimateHeight() ?? 48, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef(),
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 12
    })
    const rows = table.getSortedRowModel().rows
    return {
        rowVirtualizer,
        columnVirtualizer,
        rows,
        ...sticky
    }
}
