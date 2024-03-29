import { MagicTableCtx, MagicTableCtxType } from '../MagicTableCtx'
import { Show, createMemo } from 'solid-js'
import { HeaderCell } from './HeaderCell'
import { Header } from '@tanstack/solid-table'
import { VirtualItem } from '@tanstack/solid-virtual'
import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Key } from '@solid-primitives/keyed'

export function HeaderRow<T>(props: {
    hideWhenEmpty?: boolean
    absolute: boolean
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[]
    headers: Header<T, unknown>[]
    level: number
    isLastRow?: boolean
    position: 'center' | 'left' | 'right'
}) {
    const { columnVirtualizer, estimateHeight, width, paddingRight } = MagicTableCtx.use<MagicTableCtxType<T>>()
    const columns = createMemo(() => {
        if (['left', 'right'].includes(props.position))
            return props.headers.map((_, index) => {
                return { index } as VirtualItem
            })
        if (props.columnsFilter) return props.columnsFilter(columnVirtualizer.getVirtualItems())
        return columnVirtualizer.getVirtualItems()
    })
    const rightSideLeft = createMemo(() => {
        return width() - paddingRight()
    })
    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                data-level={props.level}
                class={classNames(props.position !== 'center' ? 'absolute pointer-events-none' : 'relative', ' flex border-b w-full')}
                style={
                    props.absolute
                        ? {
                            height: toCSSPx(estimateHeight(), '48px'),
                            top: props.position !== 'center' ? toCSSPx(props.level * 48) : undefined
                        }
                        : {}
                }
            >
                <Key by="key" each={columns()}>
                    {(item) => {
                        const header = createMemo(() => props.headers[item().index])

                        return (
                            <Show when={header()}>
                                <HeaderCell
                                    paddingLeft={props.position === 'right' ? rightSideLeft() : 0}
                                    absolute={props.absolute}
                                    header={header()}
                                    item={item()}
                                    useHeaderStart={!props.isLastRow}
                                ></HeaderCell>
                            </Show>
                        )
                    }}
                </Key>
            </tr>
        </Show>
    )
}
