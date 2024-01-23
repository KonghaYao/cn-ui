import { Atom, DebounceAtom } from '@cn-ui/reactive'
import { Table } from '@tanstack/solid-table'
import { VirtualItem, createVirtualizer } from '@tanstack/solid-virtual'
import { createMemo } from 'solid-js'
import { MagicTableProps } from './Table'

export function useVirtual<T>(table: Table<T>, tableContainerRef: Atom<HTMLDivElement | null>, props: MagicTableProps<T>) {
    const averageWidth = createMemo(() => {
        const columnsWidths =
            table
                .getRowModel()
                .rows[0]?.getCenterVisibleCells()
                ?.slice(0, 16)
                ?.map((cell) => cell.column.getSize()) ?? []
        return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length
    })
    const columnVirtualizer = createVirtualizer({
        get count() {
            return props.columns.length
        },
        estimateSize: () => {
            return averageWidth()
        }, //average column width in pixels
        getScrollElement: () => tableContainerRef(),
        horizontal: true,
        overscan: 3
    })

    //dynamic row height virtualization - alternatively you could use a simpler fixed row height strategy without the need for `measureElement`
    const rowVirtualizer = createVirtualizer({
        get count() {
            return props.data.length
        },
        estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
        getScrollElement: () => tableContainerRef(),
        //measure dynamic row height, except in firefox because it measures table border height incorrectly
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 3
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
        virtualRows: DebounceAtom((() => virtualRows) as Atom<VirtualItem[]>, 10),
        virtualColumnsIndex
    }
}
