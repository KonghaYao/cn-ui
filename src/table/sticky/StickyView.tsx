import { Row, Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For } from 'solid-js'
import { atom, computed, useEffect } from '@cn-ui/reactive'
import { useScroll } from 'solidjs-use'
import { BodyCell } from '../slot/BodyCell'
import { HeaderCell } from '../slot/HeaderCell'

function getScrollBarWidth() {
    try {
        let el = document.createElement('div')
        el.style.cssText = 'overflow:scroll; visibility:hidden; position:absolute;'
        document.body.appendChild(el)
        let width = el.offsetWidth - el.clientWidth
        el.remove()
        return width
    } catch (e) {
        console.warn('滚动条高度获取失败')
        return 15
    }
}

export function StickyViewBody<T>(props: { table: Table<T>; selection: boolean }) {
    const scrollbarHeight = getScrollBarWidth()
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
                // fix: 修复多出滚动条高度的问题
                height: `calc(100% - ${scrollbarHeight}px)`,
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
                                    return <HeaderCell header={header}></HeaderCell>
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
                                            return <BodyCell cell={cell}></BodyCell>
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
