import { ColumnDef } from '@tanstack/solid-table'

export const selectionConfig = {
    id: 'select',
    size: 25,
    header: ({ table }) => {
        return (
            <div class="px-1">
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                ></input>
            </div>
        )
    },
    cell: ({ row }: { row: any }) => {
        return (
            <div class="px-1">
                <input type="checkbox" checked={row.getIsSelected()} disabled={!row.getCanSelect()} onChange={row.getToggleSelectedHandler()}></input>
            </div>
        )
    }
} as ColumnDef<any>
