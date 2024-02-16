import { classNames, toCSSPx } from '@cn-ui/reactive'
import { Header, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx } from '../MagicTableCtx'
import { AiOutlineCaretUp } from 'solid-icons/ai'
import { VirtualItem } from '@tanstack/solid-virtual'

export function HeaderCell<T, D>(props: { absolute?: boolean; header: Header<T, D>; item: VirtualItem }) {
    const { estimateHeight } = MagicTableCtx.use()
    const header = props.header
    return (
        <th
            class={classNames(props.absolute !== false && 'absolute', ' block bg-gray-100 py-2 text-sm')}
            style={{
                width: header.getSize() + 'px',
                height: toCSSPx(estimateHeight(), '48px'),
                left: toCSSPx(props.item.start),
                top: 0
            }}
        >
            <div class={header.column.getCanSort() ? 'cursor-pointer select-none' : ' '} onClick={header.column.getToggleSortingHandler()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
            {header.column.getCanSort() && <SortingStateIcon state={header.column.getIsSorted()}></SortingStateIcon>}
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
