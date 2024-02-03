import { For, createMemo } from 'solid-js'
import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { BodyCell } from './BodyCell'
import { classNames, computed } from '@cn-ui/reactive'
import { Cell, Row, Table } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'

export function BodyRow<T, D>(props: {
    index?: string | number
    bindScroll?: boolean
    padding?: boolean
    cells?: Cell<T, unknown>[]
    columns?: number[]
    virtualRow: VirtualItem
}) {
    const { rowVirtualizer, virtualPadding, virtualColumnsIndex, table, selection } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const row = table.getRowModel().rows[props.virtualRow.index]
    const visibleRows = createMemo(() => props.cells ?? row.getVisibleCells())
    return (
        <tr
            data-index={props.virtualRow.index} //needed for dynamic row height measurement
            ref={(node) => {
                if (props.bindScroll !== false) queueMicrotask(() => rowVirtualizer.measureElement(node))
            }} //measure dynamic row height
            class={classNames(
                'flex absolute w-full duration-300 transition-colors ',
                row.getIsSelected() ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-100'
            )}
            style={{
                transform: `translateY(${props.virtualRow.start}px)`
            }}
            onClick={() => {
                selection() && row.toggleSelected()
            }}
        >
            {props.padding && virtualPadding().left ? (
                //fake empty column to the left for virtualization scroll padding
                <td style={{ display: 'flex', width: virtualPadding().left + 'px' }} />
            ) : null}
            <For each={props.columns || virtualColumnsIndex()}>
                {(index) => {
                    return <BodyCell cell={visibleRows()[index]}></BodyCell>
                }}
            </For>
            {props.padding && virtualPadding().right ? (
                //fake empty column to the right for virtualization scroll padding
                <td style={{ display: 'flex', width: virtualPadding().right + 'px' }} />
            ) : null}
        </tr>
    )
}
