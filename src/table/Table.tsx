import { atom } from '@cn-ui/reactive'
import { flexRender, getSortedRowModel, getCoreRowModel, ColumnDef, createSolidTable, Row } from '@tanstack/solid-table'
import { createVirtualizer } from '@tanstack/solid-virtual'
import { createMemo } from 'solid-js'

export function Table<T>(props: { data: T[]; columns: ColumnDef<T>[] }) {
    const table = createSolidTable({
        get data() {
            return props.data
        },
        get columns() {
            return props.columns
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    const { rows } = table.getRowModel()
    const tableContainerRef = atom<HTMLDivElement | null>(null)
    const average = createMemo(() => {})
    const columnVirtualizer = createVirtualizer({
        get count() {
            return table.getVisibleLeafColumns().length
        },
        estimateSize: () => {
            const columnsWidths =
                table
                    .getRowModel()
                    .rows[0]?.getCenterVisibleCells()
                    ?.slice(0, 16)
                    ?.map((cell) => cell.column.getSize()) ?? []
            return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length
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
        measureElement: typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1 ? (element) => element?.getBoundingClientRect().height : undefined,
        overscan: 5
    })

    const virtualRows = rowVirtualizer.getVirtualItems()
    const virtualColumns = columnVirtualizer.getVirtualItems()
    const virtualPadding = createMemo(() => {
        average()
        //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
        let virtualPaddingLeft: number | undefined
        let virtualPaddingRight: number | undefined

        if (columnVirtualizer && virtualColumns?.length) {
            virtualPaddingLeft = virtualColumns[0]?.start ?? 0
            virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
        }
        return { left: virtualPaddingLeft ?? 0, right: virtualPaddingRight ?? 0 }
    })

    return (
        <div
            style={{
                overflow: 'auto', //our scrollable table container
                position: 'relative', //needed for sticky header
                height: '200px' //should be a fixed height
            }}
            ref={tableContainerRef}
        >
            <table class="border border-gray-200 " style={{ display: 'grid', 'table-layout': 'fixed' }}>
                <thead
                    style={{
                        display: 'grid',
                        position: 'sticky',
                        top: 0,
                        'z-index': 1
                    }}
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr style={{ display: 'flex', width: '100%' }} data-index={headerGroup.id}>
                            {virtualPadding().left ? (
                                //fake empty column to the left for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                            ) : null}
                            {virtualColumns.map((vc) => {
                                const header = headerGroup.headers[vc.index]

                                return (
                                    <th
                                        data-index={header.id}
                                        style={{
                                            display: 'flex',
                                            width: header.getSize() + 'px'
                                        }}
                                    >
                                        <div class={header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={header.column.getToggleSortingHandler}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽'
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    </th>
                                )
                            })}
                            {virtualPadding().right ? (
                                //fake empty column to the right for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                            ) : null}
                        </tr>
                    ))}
                </thead>
                <tbody
                    style={{
                        display: 'grid',
                        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                        position: 'relative' //needed for absolute positioning of rows
                    }}
                >
                    {virtualRows.map((virtualRow) => {
                        const row = rows[virtualRow.index] as Row<T>
                        const visibleCells = row.getVisibleCells()

                        return (
                            <tr
                                data-index={virtualRow.index} //needed for dynamic row height measurement
                                ref={(node) => queueMicrotask(() => rowVirtualizer.measureElement(node))} //measure dynamic row height
                                style={{
                                    display: 'flex',
                                    position: 'absolute',
                                    transform: `translateY(${virtualRow.start}px)`,
                                    width: '100%'
                                }}
                            >
                                {virtualPadding().left ? (
                                    //fake empty column to the left for virtualization scroll padding
                                    <td style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                                ) : null}
                                {virtualColumns.map((vc) => {
                                    const cell = visibleCells[vc.index]
                                    return (
                                        <td
                                            data-index={cell.id}
                                            style={{
                                                display: 'flex',
                                                width: cell.column.getSize() + 'px'
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                })}
                                {virtualPadding().right ? (
                                    //fake empty column to the right for virtualization scroll padding
                                    <td style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                                ) : null}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
