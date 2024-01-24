import { Atom, ThrottleAtom } from '@cn-ui/reactive'
import { Table } from '@tanstack/solid-table'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { createMemo, Accessor } from 'solid-js'

export function useVirtual<T>(table: Table<T>, tableContainerRef: Atom<HTMLDivElement | null>, data: { composedColumns: Accessor<unknown[]> }) {
    const columnVirtualizer = createVirtualizer({
        get count() {
            return data.composedColumns().length
        },
        estimateSize(index) {
            return data.composedColumns()[index].size ?? 100
        }, //average column width in pixels
        getScrollElement: () => tableContainerRef(),
        horizontal: true,
        overscan: 12
    })
    //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
    const rowVirtualizer = createVirtualizer({
        get count() {
            return table.getRowModel().rows.length
        },
        estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef(),
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 12
    })

    const virtualRows = rowVirtualizer.getVirtualItems()
    const virtualColumns = columnVirtualizer.getVirtualItems()
    const virtualPadding = createMemo(() => {
        //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
        let virtualPaddingLeft: number | undefined
        let virtualPaddingRight: number | undefined

        if (columnVirtualizer && virtualColumns?.length) {
            virtualPaddingLeft = virtualColumns[0]?.start ?? 0
            virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
        }
        return { left: virtualPaddingLeft ?? 0, right: virtualPaddingRight ?? 0 }
    })
    const virtualColumnsIndex = createMemo(() => {
        return columnVirtualizer.getVirtualItems().map((column) => column.index)
    })
    return {
        virtualPadding,
        rowVirtualizer,
        virtualRows: ThrottleAtom(() => virtualRows, 16),
        virtualColumnsIndex: ThrottleAtom(virtualColumnsIndex, 16)
    }
}
