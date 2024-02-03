import { Row, Table } from '@tanstack/solid-table'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For } from 'solid-js'
import { atom, classNames, computed, useEffect } from '@cn-ui/reactive'
import { useScroll } from 'solidjs-use'
import { HeaderCell } from '../slot/HeaderCell'
import { BodyRow } from '../slot/BodyRow'
import { HeaderRow } from '../slot/HeaderRow'

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
            class={classNames('absolute bg-gray-50 top-0 left-0 overflow-hidden', 'shadow-lg  shadow-b')}
            style={{
                'box-shadow': 'rgba(0, 0, 0, 0) 0px 0px, rgba(0, 0, 0, 0) 0px 0px, rgba(0, 0, 0, 0.1) 10px 0 15px -3px, rgba(0, 0, 0, 0.1) 4px 0 6px -4px',
                'max-width': '100%',
                // fix: 修复多出滚动条高度的问题
                height: `calc(100% - ${scrollbarHeight}px)`,
                'z-index': 100
            }}
            ref={receiverTable}
        >
            <table class="grid table-fixed">
                <thead class="grid sticky top-0 z-10">
                    {table.getHeaderGroups().map((headerGroup) => {
                        return <HeaderRow padding={false} columns={stickingItems()} headers={headerGroup.headers}></HeaderRow>
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
                            const visibleCells = getRow(virtualRow.index).getVisibleCells()
                            return <BodyRow padding={false} cells={visibleCells} bindScroll={false} columns={stickingItems()} virtualRow={virtualRow}></BodyRow>
                        }}
                    </For>
                </tbody>
            </table>
        </nav>
    )
}
