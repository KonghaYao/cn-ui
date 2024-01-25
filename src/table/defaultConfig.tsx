import { ColumnDef } from '@tanstack/solid-table'
import { MagicColumnConfig } from '.'

export const selectionConfig = {
    id: '$select',
    size: 25,
    header: ({ table }) => {
        return (
            <div class="px-2">
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                ></input>
            </div>
        )
    },
    cell: ({ row }) => {
        return (
            <div class="p-2">
                <input type="checkbox" checked={row.getIsSelected()} disabled={!row.getCanSelect()} onChange={row.getToggleSelectedHandler()}></input>
            </div>
        )
    },
    sticky: true
} as MagicColumnConfig
export const indexConfig = {
    id: '$index',
    size: 60,
    cell(ctx) {
        return <div class="p-2">{ctx.row.index}</div>
    },
    sticky: true
} as ColumnDef<any>
