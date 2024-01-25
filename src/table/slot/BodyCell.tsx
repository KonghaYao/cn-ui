import { Cell, CellContext, flexRender } from '@tanstack/solid-table'

export function BodyCell<T, D>(props: { cell: Cell<T, D> }) {
    const ctx = props.cell.getContext()
    const defaultCell = ctx.table._getDefaultColumnDef().cell
    const cell = props.cell.column.columnDef.cell
    return (
        <td
            class="flex"
            style={{
                width: props.cell.column.getSize() + 'px'
            }}
        >
            {flexRender(cell === defaultCell ? defaultBodyCell : cell, ctx)}
        </td>
    )
}

function defaultBodyCell<T>(ctx: CellContext<T, unknown>) {
    return <div class="w-full h-full flex-1 p-2">{ctx.getValue()}</div>
}
