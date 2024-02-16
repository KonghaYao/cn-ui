import { For, JSXElement, Show, createMemo } from 'solid-js'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { BodyCell } from './BodyCell'
import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Cell } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'

export function BodyRow<T, D>(props: {
    index?: string | number
    bindScroll?: boolean
    cells?: Cell<T, unknown>[]
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    children?: (item: VirtualItem) => JSXElement
    virtualRow: VirtualItem
    hideWhenEmpty?: boolean
    absolute?: boolean
}) {
    const { columnVirtualizer, rows, selection, rowVirtualizer, estimateHeight } = MagicTableCtx.use<MagicTableCtxType<T>>()

    const row = rows[props.virtualRow.index]
    const visibleCells = createMemo(() => props.cells ?? row.getVisibleCells())
    const columns = createMemo(() => {
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })

    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                data-index={props.virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => {
                    if (props.bindScroll !== false) queueMicrotask(() => rowVirtualizer.measureElement(node))
                }} //measure dynamic row height
                class={classNames(
                    props.absolute !== false && 'absolute',
                    'flex w-full duration-300 transition-colors ',
                    row.getIsSelected() ? 'bg-primary-100 hover:bg-primary-200' : 'hover:bg-design-hover'
                )}
                style={{
                    top: toCSSPx(props.virtualRow.start),
                    height: toCSSPx(estimateHeight(), '48px')
                }}
                onClick={() => {
                    selection() && row.toggleSelected()
                }}
            >
                <For each={columns()}>
                    {(item) => {
                        return <BodyCell absolute={props.absolute} cell={visibleCells()[item.index]} item={item}></BodyCell>
                    }}
                </For>
            </tr>
        </Show>
    )
}
