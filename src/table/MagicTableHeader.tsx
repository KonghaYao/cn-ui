import { flexRender } from '@tanstack/solid-table'
import { Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For, Index } from 'solid-js'

export function MagicTableHeader<T>(props: { table: Table<T> }) {
    const table = props.table
    const { virtualPadding, virtualColumnsIndex } = MagicTableCtx.use<MagicTableCtxType<T>>()
    return (
        <thead
            style={{
                display: 'grid',
                position: 'sticky',
                top: 0,
                'z-index': 1
            }}
        >
            <Index each={table.getHeaderGroups()}>
                {(headerGroup) => {
                    const headers = headerGroup().headers
                    return (
                        <tr style={{ display: 'flex', width: '100%' }}>
                            {virtualPadding().left ? (
                                //fake empty column to the left for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
                            ) : null}
                            <Index each={virtualColumnsIndex()}>
                                {(index) => {
                                    const header = headers[index()]

                                    return (
                                        <th
                                            style={{
                                                display: 'flex',
                                                width: header.getSize() + 'px'
                                            }}
                                        >
                                            <div
                                                class={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                                onClick={header.column.getToggleSortingHandler}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽'
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        </th>
                                    )
                                }}
                            </Index>
                            {virtualPadding().right ? (
                                //fake empty column to the right for virtualization scroll padding
                                <th style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
                            ) : null}
                        </tr>
                    )
                }}
            </Index>
        </thead>
    )
}
