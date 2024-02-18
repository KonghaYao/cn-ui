import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Header, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx } from '../MagicTableCtx'
import { AiOutlineCaretUp } from 'solid-icons/ai'
import { VirtualItem } from '@tanstack/solid-virtual'
import { Show, createMemo } from 'solid-js'
import { getCommonPinningStyles } from './getCommonPinningStyles'

export function HeaderCell<T, D>(props: {
    paddingLeft: number
    absolute: boolean
    header: Header<T, D>
    item: VirtualItem
    level?: number
    useHeaderStart?: boolean
}) {
    const { estimateHeight } = MagicTableCtx.use()
    const header = createMemo(() => props.header)
    const column = createMemo(() => header().column)
    return (
        <th
            class={classNames(props.absolute && 'absolute', ' block bg-gray-100 py-2 text-sm')}
            style={{
                width: toCSSPx(header().getSize()),
                height: toCSSPx(estimateHeight(), '48px'),
                left: props.useHeaderStart ? toCSSPx(props.paddingLeft + header().getStart()) : toCSSPx(props.paddingLeft + props.item.start),
                ...getCommonPinningStyles(column(), props.paddingLeft)
            }}
        >
            <div class={column().getCanSort() ? 'cursor-pointer select-none' : ' '} onClick={column().getToggleSortingHandler()}>
                <Show when={!header().isPlaceholder}>{flexRender(column().columnDef.header, header().getContext())}</Show>
            </div>
            <Show when={!header().isPlaceholder && column().getCanSort()}>
                <SortingStateIcon state={column().getIsSorted()}></SortingStateIcon>
            </Show>
        </th>
    )
}

export const SortingStateIcon = (props: { state: 'asc' | 'desc' | false }) => {
    return (
        <div class="absolute justify-center right-0 top-0 h-full w-4 flex flex-col">
            <AiOutlineCaretUp class={props.state === 'asc' ? 'fill-blue-600' : 'fill-blue-600/20'} size={12}></AiOutlineCaretUp>
            <AiOutlineCaretUp class={classNames('rotate-180', props.state === 'desc' ? 'fill-blue-600' : 'fill-blue-600/20')} size={12}></AiOutlineCaretUp>
        </div>
    )
}
