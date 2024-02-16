import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For, Show, createMemo } from 'solid-js'
import { HeaderCell } from './HeaderCell'
import { Header } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'
import { toCSSPx } from '@cn-ui/reactive'

export function HeaderRow<T>(props: {
    hideWhenEmpty?: boolean
    absolute?: boolean
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    headers: Header<T, unknown>[]
}) {
    const { columnVirtualizer } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const { estimateHeight } = MagicTableCtx.use()
    const columns = createMemo(() => {
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })
    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                class="relative flex"
                style={
                    props.absolute
                        ? {
                              width: toCSSPx(columnVirtualizer.getTotalSize()),
                              height: toCSSPx(estimateHeight(), '48px')
                          }
                        : {}
                }
            >
                <For each={columns()}>
                    {(item) => {
                        const header = props.headers[item.index]
                        return <HeaderCell absolute={props.absolute} header={header} item={item}></HeaderCell>
                    }}
                </For>
            </tr>
        </Show>
    )
}
