import { Row, Table, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from './MagicTableCtx'
import { For, Show } from 'solid-js'
import { atom, computed, useEffect, useEffectWithoutFirst } from '@cn-ui/reactive'
import { useScroll } from 'solidjs-use'

export function StickyViewBody<T>(props: { table: Table<T>; selection: boolean }) {
    const table = props.table
    const { stickingItems, virtualRows, rowVirtualizer, tableScroll } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const receiverTable = atom<HTMLElement | null>(null)
    // 同步滚动条
    const whenShow = computed(() => !!stickingItems().length)
    const tbodyScroll = useScroll(receiverTable)
    useEffect(() => {
        tbodyScroll.setY(tableScroll.y())
    }, [tableScroll.y, whenShow])

    const getRow = (index: number): Row<T> => table.getRowModel().rows[index]
    return (
        <nav
            class="absolute bg-gray-50 top-0 left-0 overflow-hidden"
            style={{
                height: '100%',
                'z-index': 100
            }}
            ref={receiverTable}
        >
            <table style={{ display: 'grid', 'table-layout': 'fixed' }}>
                <thead
                    style={{
                        display: 'grid',
                        position: 'sticky',
                        top: 0,
                        'z-index': 1
                    }}
                >
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <div style={{ display: 'flex', width: '100%' }}>
                                {stickingItems().map((index) => {
                                    const header = headerGroup.headers[index]
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
                                })}
                            </div>
                        )
                    })}
                </thead>
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
                            const visibleCells = row.getAllCells()
                            return (
                                <tr
                                    data-index={virtualRow.index} //needed for dynamic row height measurement
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
                                    <For each={stickingItems()}>
                                        {(index) => {
                                            const cell = visibleCells[index]
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
                                    </For>
                                </tr>
                            )
                        }}
                    </For>
                </tbody>
            </table>
        </nav>
    )
}
