import { flexRender, Row } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For, Index } from 'solid-js'
import { DebounceAtom } from '@cn-ui/reactive'

export function MagicTableBody<T>(props: { table: Table<T> }) {
    const table = props.table

    const { rowVirtualizer, virtualRows, virtualPadding, virtualColumnsIndex } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <tbody
            style={{
                display: 'grid',
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: 'relative' //needed for absolute positioning of rows
            }}
        >
            <Index each={virtualRows()}>
                {(virtualRow) => {
                    const getRow = (): Row<T> => table.getRowModel().rows[virtualRow().index]
                    const row = getRow()
                    const visibleCells = row.getVisibleCells()
                    return (
                        <tr
                            data-index={virtualRow().index} //needed for dynamic row height measurement
                            ref={(node) => queueMicrotask(() => rowVirtualizer.measureElement(node))} //measure dynamic row height
                            style={{
                                display: 'flex',
                                position: 'absolute',
                                transform: `translateY(${virtualRow().start}px)`,
                                width: '100%',
                                background: row.getIsSelected() ? '#0000ff24' : 'transparent'
                            }}
                            onClick={() => {
                                row.toggleSelected()
                            }}
                        >
                            {virtualPadding().left ? (
                                //fake empty column to the left for virtualization scroll padding
                                <td style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                            ) : null}
                            <Index each={virtualColumnsIndex()}>
                                {(index) => {
                                    const cell = visibleCells[index()]
                                    return (
                                        <td
                                            style={{
                                                display: 'flex',
                                                width: cell.column.getSize() + 'px'
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    )
                                }}
                            </Index>
                            {virtualPadding().right ? (
                                //fake empty column to the right for virtualization scroll padding
                                <td style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                            ) : null}
                        </tr>
                    )
                }}
            </Index>
        </tbody>
    )
}
