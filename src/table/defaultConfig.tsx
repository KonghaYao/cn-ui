import { ColumnDef } from '@tanstack/solid-table'
import { MagicColumnConfig } from '.'
import { Checkbox } from '../control/checkbox'

export const selectionConfig = {
    id: '$select',
    size: 25,
    header: ({ table }) => {
        return (
            <div class="px-2">
                <Checkbox
                    label=""
                    value=""
                    v-model={() => table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                ></Checkbox>
            </div>
        )
    },
    cell: ({ row }) => {
        return (
            <div class="p-2">
                <Checkbox
                    v-model={() => row.getIsSelected()}
                    label=""
                    value=""
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                ></Checkbox>
            </div>
        )
    },
    sticky: true
} as MagicColumnConfig

export const indexConfig = {
    id: '$index',
    size: 60,
    header: ({ table }) => {
        return <div class="p-2 w-full text-center">#</div>
    },
    cell(ctx) {
        return <div class="p-2 w-full text-center">{ctx.row.index}</div>
    },
    sticky: true
} as ColumnDef<any>
