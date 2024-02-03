import { toCSSPx } from '@cn-ui/reactive'
import { Header, flexRender } from '@tanstack/solid-table'
import { MagicTableCtx } from '../MagicTableCtx'

export function HeaderCell<T, D>(props: { header: Header<T, D> }) {
    const { estimateHeight } = MagicTableCtx.use()
    return (
        <th
            class="bg-gray-100 py-2 text-sm"
            style={{
                width: props.header.getSize() + 'px',
                height: toCSSPx(estimateHeight(), '48px')
            }}
        >
            <div class={props.header.column.getCanSort() ? 'cursor-pointer select-none' : ''} onClick={props.header.column.getToggleSortingHandler}>
                {flexRender(props.header.column.columnDef.header, props.header.getContext())}
                {{
                    asc: ' 🔼',
                    desc: ' 🔽'
                }[props.header.column.getIsSorted() as string] ?? null}
            </div>
        </th>
    )
}
