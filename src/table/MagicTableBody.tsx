import { Row } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For } from 'solid-js'
import { BodyCell } from './slot/BodyCell'

export function MagicTableBody<T>(props: { table: Table<T>; selection: boolean }) {
    const table = props.table

    const { rowVirtualizer, virtualRows, virtualPadding, virtualColumnsIndex } = MagicTableCtx.use<MagicTableCtxType<T>>()

    const getRow = (index: number): Row<T> => table.getRowModel().rows[index]
    return (
        <tbody
            style={{
                display: 'grid',
                height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
                position: 'relative' //needed for absolute positioning of rows
            }}
        >
            <For each={virtualRows()}>
                {(virtualRow) => {
                    const row = getRow(virtualRow.index)
                    const visibleCells = row.getVisibleCells()
                    return (
                        <tr
                            data-index={virtualRow.index} //needed for dynamic row height measurement
                            ref={(node) => queueMicrotask(() => rowVirtualizer.measureElement(node))} //measure dynamic row height
                            style={{
                                display: 'flex',
                                position: 'absolute',
                                transform: `translateY(${virtualRow.start}px)`,
                                width: '100%',
                                background: row.getIsSelected() ? '#0000ff24' : 'transparent'
                            }}
                            onClick={() => {
                                props.selection && row.toggleSelected()
                            }}
                        >
                            {virtualPadding().left ? (
                                //fake empty column to the left for virtualization scroll padding
                                <td style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                            ) : null}
                            <For each={virtualColumnsIndex()}>
                                {(index) => {
                                    const cell = visibleCells[index]
                                    return <BodyCell cell={cell}></BodyCell>
                                }}
                            </For>
                            {virtualPadding().right ? (
                                //fake empty column to the right for virtualization scroll padding
                                <td style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                            ) : null}
                        </tr>
                    )
                }}
            </For>
        </tbody>
    )
}
