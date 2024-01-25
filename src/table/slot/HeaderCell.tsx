import { Header, flexRender } from '@tanstack/solid-table'

export function HeaderCell<T, D>(props: { header: Header<T, D> }) {
    return (
        <th
            style={{
                display: 'flex',
                width: props.header.getSize() + 'px'
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
