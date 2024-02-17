import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { For, Show, createEffect, createMemo } from 'solid-js'
import { HeaderCell } from './HeaderCell'
import { Header } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'
import { toCSSPx } from '@cn-ui/reactive'
import { Key } from '@solid-primitives/keyed'

export function HeaderRow<T>(props: {
    hideWhenEmpty?: boolean
    absolute: boolean
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    headers: Header<T, unknown>[]
    level?: number
    isLastRow?: boolean
    position: 'center' | 'left' | 'right'
}) {
    const { columnVirtualizer } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const { estimateHeight } = MagicTableCtx.use()
    const columns = createMemo(() => {
        if (['left', 'right'].includes(props.position))
            return props.headers.map((i, index) => {
                return { index } as VirtualItem
            })
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })
    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                class="relative flex border-b w-full"
                style={
                    props.absolute
                        ? {
                              height: toCSSPx(estimateHeight(), '48px')
                          }
                        : {}
                }
            >
                <Key by="key" each={columns()}>
                    {(item, index) => {
                        const header = createMemo(() => props.headers[item().index])

                        return (
                            <Show when={header()}>
                                <HeaderCell absolute={props.absolute} header={header()} item={item()} useHeaderStart={!props.isLastRow}></HeaderCell>
                            </Show>
                        )
                    }}
                </Key>
            </tr>
        </Show>
    )
}
