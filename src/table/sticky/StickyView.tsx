import { Row, Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For } from 'solid-js'
import { atom, computed, useEffect } from '@cn-ui/reactive'
import { useScroll } from 'solidjs-use'
import { HeaderCell } from '../slot/HeaderCell'
import { BodyRow } from '../slot/BodyRow'

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

export function StickyViewBody<T>() {
    const scrollbarHeight = getScrollBarWidth()
    const { stickingItems, virtualRows, rowVirtualizer, tableScroll, table } = MagicTableCtx.use<MagicTableCtxType<T>>()
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
            <table class="grid table-fixed">
                <thead class="grid sticky top-0 z-10">
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
                    class="grid relative"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px` //tells scrollbar how big the table is
                    }}
                >
                    <For each={virtualRows()}>
                        {(virtualRow) => {
                            const visibleCells = getRow(virtualRow.index).getAllCells()
                            return <BodyRow padding={false} cells={visibleCells} bindScroll={false} columns={stickingItems()} virtualRow={virtualRow}></BodyRow>
                        }}
                    </For>
                </tbody>
            </table>
        </nav>
    )
}
