import { For, JSXElement, Show, createEffect, createMemo } from 'solid-js'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { BodyCell } from './BodyCell'
import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Cell } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'
import { Key } from '@solid-primitives/keyed'

export function BodyRow<T, D>(props: {
    index?: string | number
    bindScroll?: boolean
    cells?: Cell<T, unknown>[]
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    children?: (item: VirtualItem) => JSXElement
    virtualRow: VirtualItem
    hideWhenEmpty?: boolean
    absolute: boolean
    position: 'center' | 'left' | 'right'
}) {
    const { columnVirtualizer, rows, selection, rowVirtualizer, estimateHeight, rowVirtualPadding } = MagicTableCtx.use<MagicTableCtxType<T>>()

    const row = createMemo(() => rows()[props.virtualRow.index])
    const rowVisibleCells = createMemo(() => {
        switch (props.position) {
            case 'center':
                return row().getCenterVisibleCells()
            case 'left':
                return row().getLeftVisibleCells()
            case 'right':
                return row().getRightVisibleCells()
            default:
                return row().getVisibleCells()
        }
    })
    const visibleCells = createMemo(() => props.cells ?? rowVisibleCells())
    const columns = createMemo(() => {
        if (['left', 'right'].includes(props.position))
            return rowVisibleCells().map((i, index) => {
                return { index } as VirtualItem
            })
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })

    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                data-index={props.virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => {
                    if (props.bindScroll !== false && props.absolute) queueMicrotask(() => rowVirtualizer.measureElement(node))
                }} //measure dynamic row height
                class={classNames(
                    props.absolute && 'absolute',
                    'flex w-full duration-300 transition-colors border-b',
                    row().getIsSelected() ? 'bg-primary-100 hover:bg-primary-200' : 'hover:bg-design-hover'
                )}
                style={{
                    top: toCSSPx(props.virtualRow.start),
                    height: toCSSPx(estimateHeight(), '48px')
                }}
                onClick={() => {
                    selection() && row().toggleSelected()
                }}
            >
                <Key by="key" each={columns()}>
                    {(item) => {
                        const cell = createMemo(() => visibleCells()[item().index])
                        return (
                            <Show when={cell()}>
                                <BodyCell absolute={props.absolute} cell={cell()} item={item()}></BodyCell>
                            </Show>
                        )
                    }}
                </Key>
            </tr>
        </Show>
    )
}
