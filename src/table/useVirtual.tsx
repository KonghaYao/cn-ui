import { Table } from '@tanstack/solid-table'
import { Atom } from '@cn-ui/reactive'
import { createVirtualizer } from './virtual/createVirtualizer'
import { Accessor, createMemo } from 'solid-js'
import { MagicColumnConfig } from '.'

export function useVirtual<T>(
    table: Table<T>,
    tableContainerRef: Atom<HTMLDivElement | null>,
    data: { composedColumns: Accessor<MagicColumnConfig<T>[]>; estimateHeight: Accessor<number | undefined> }
) {
    const paddingLeft = createMemo(() => {
        const last = table.getLeftLeafColumns().at(-1)
        if (!last) return 0
        return last.getSize() + last.getStart('left')
    })
    const paddingRight = createMemo(() => {
        const last = table.getRightLeafColumns().at(-1)
        if (!last) return 0
        return last.getSize() + last.getStart('right')
    })
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
        horizontal: true,
        overscan: 12,
        get paddingStart() {
            return paddingLeft()
        },
        get paddingEnd() {
            return paddingRight()
        }
    })

    // 添加初始化 sticky 特性
    table.getLeafHeaders().forEach((i) => {
        /** @ts-ignore */
        const position = i.column.columnDef.sticky
        i.column.pin(position)
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

    return {
        rowVirtualizer,
        columnVirtualizer,
        tableWidth() {
            return columnVirtualizer.getTotalSize()
        },
        paddingLeft,
        paddingRight,
        rows
    }
}
