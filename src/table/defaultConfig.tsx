import { ColumnDef } from '@tanstack/solid-table'
import { MagicColumnConfig } from '.'
import { Checkbox } from '../control/checkbox'
import { computed } from '@cn-ui/reactive'

export const selectionConfig = {
    id: '$select',
    size: 35,
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
    cell: (props) => {
        const checked = computed(() => props.row.getIsSelected())
        return (
            <div class="p-2">
                <Checkbox v-model={checked} label="" value="" disabled={!props.row.getCanSelect()} onChange={props.row.getToggleSelectedHandler()}></Checkbox>
            </div>
        )
    },
    sticky: 'right'
} as MagicColumnConfig

export const indexConfig = {
    id: '$index',
    size: 60,
    header: '#',
    cell(ctx) {
        return <div class="p-2 w-full text-center">{ctx.row.index}</div>
    },
    sticky: 'right',
    forceSorting: true,
    accessorFn(_, index) {
        return index
    }
} as ColumnDef<any>
