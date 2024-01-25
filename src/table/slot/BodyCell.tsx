import { Cell, flexRender } from '@tanstack/solid-table'

export function BodyCell<T, D>(props: { cell: Cell<T, D> }) {
    return (
        <td
            style={{
                display: 'flex',
                width: props.cell.column.getSize() + 'px'
            }}
        >
            {flexRender(props.cell.column.columnDef.cell, props.cell.getContext())}
        </td>
    )
}
