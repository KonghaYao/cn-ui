import { For, JSXElement, Show, createEffect, createMemo } from 'solid-js'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { BodyCell } from './BodyCell'
import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Cell } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'
import { Key } from '@solid-primitives/keyed'
import './bodyRow.css'
export function BodyRow<T, D>(props: {
    index?: string | number
    bindScroll?: boolean
    cells?: Cell<T, unknown>[]
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    children?: (item: VirtualItem) => JSXElement
    virtualRow: VirtualItem
    hideWhenEmpty?: boolean
    absolute: boolean
}) {
    const { columnVirtualizer, rows, width, paddingRight, selection, rowVirtualizer, estimateHeight } = MagicTableCtx.use<MagicTableCtxType<T>>()

    const row = createMemo(() => rows()[props.virtualRow.index])
    const rowVisibleCells = createMemo(() => {
        return row()?.getCenterVisibleCells() ?? []
    })

    const visibleCells = createMemo(() => props.cells ?? rowVisibleCells())

    const columns = createMemo(() => {
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })
    const rightSideLeft = createMemo(() => {
        return width() - paddingRight()
    })
    return (
        <Show when={(!props.hideWhenEmpty || columns().length) && row()}>
            <tr
                data-index={props.virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => {
                    if (props.bindScroll !== false && props.absolute) queueMicrotask(() => rowVirtualizer.measureElement(node))
                }} //measure dynamic row height
                class={classNames(
                    props.absolute && 'absolute',
                    'cn-table-body-row  flex w-full duration-300 transition-colors border-b',
                    row().getIsSelected() && 'cn-selected'
                )}
                style={{
                    top: toCSSPx(props.virtualRow.start),
                    height: toCSSPx(estimateHeight(), '48px')
                }}
            // rowClick Selection
            // onClick={() => {
            //     selection() && row().toggleSelected()
            // }}
            >
                <Key by="id" each={row().getLeftVisibleCells()}>
                    {(cell, index) => {
                        return (
                            <Show when={cell()}>
                                <BodyCell
                                    position="left"
                                    absolute={props.absolute}
                                    cell={cell()}
                                    item={{ index: index(), start: cell().column.getStart() } as any}
                                ></BodyCell>
                            </Show>
                        )
                    }}
                </Key>
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
                <Key by="id" each={row().getRightVisibleCells()}>
                    {(cell, index) => {
                        return (
                            <Show when={cell()}>
                                <BodyCell
                                    position="right"
                                    paddingLeft={rightSideLeft()}
                                    absolute={props.absolute}
                                    cell={cell()}
                                    item={{ index: index(), start: cell().column.getStart() } as any}
                                ></BodyCell>
                            </Show>
                        )
                    }}
                </Key>
            </tr>
        </Show>
    )
}
