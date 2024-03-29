import { ColumnDef, Table } from '@tanstack/solid-table'
import { Atom } from '@cn-ui/reactive'
import { createVirtualizer } from './virtual/createVirtualizer'
import { Accessor, createMemo } from 'solid-js'

function useVirtualSticky<T>(table: Table<T>) {
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
    // 添加初始化 fixed 特性
    table.getLeafHeaders().forEach((i) => {
        const position = i.column.columnDef.fixed
        if (position) i.column.pin(position)
    })
    return {
        paddingLeft,
        paddingRight
    }
}

export function useVirtual<T>(
    table: Table<T>,
    tableContainerRef: Atom<HTMLDivElement | null>,
    data: { composedColumns: Accessor<ColumnDef<T>[]>; estimateHeight: Accessor<number | undefined> }
) {
    const { paddingLeft, paddingRight } = useVirtualSticky(table)
    const columnVirtualizer = createVirtualizer({
        get count() {
            const count = table.getCenterVisibleLeafColumns().length
            return count
        },
        estimateSize(index) {
            return table.getCenterVisibleLeafColumns()[index].columnDef.size ?? 100
        },
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

    const rowVirtualizer = createVirtualizer({
        get count() {
            return table.getCenterRows().length
        },
        estimateSize: () => data.estimateHeight() ?? 48,
        getScrollElement: () => tableContainerRef(),
        measureElement:
            typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 12
    })
    const rows = createMemo(() => table.getRowModel().rows)

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
