import { flexRender, Row } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'

export function MagicTableBody<T>(props: { table: Table<T> }) {
    const table = props.table
    const { rowVirtualizer, virtualRows, virtualPadding, virtualColumns } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <tbody
            style={{
                display: 'grid',
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: 'relative' //needed for absolute positioning of rows
            }}
        >
            {virtualRows.map((virtualRow) => {
                const row = table.getRowModel().rows[virtualRow.index] as Row<T>
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
    )
}
