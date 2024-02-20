import { ColumnDef } from '@tanstack/solid-table'
import { MagicColumnConfig } from '.'
import { Checkbox } from '../control/checkbox'
import { computed } from '@cn-ui/reactive'
import { Icon } from '../icon/Icon'
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'solid-icons/ai'

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
    sticky: 'left'
} as MagicColumnConfig

export const indexConfig = {
    id: '$index',
    size: 60,
    header: ' ',
    cell(ctx) {
        return <div class="p-2 w-full text-center">{ctx.row.index}</div>
    },
    sticky: 'left',
    forceSorting: true,
    accessorFn(_, index) {
        return index
    }
} as ColumnDef<any>

export const expandingConfig = {
    id: '$expanding',
    size: 60,
    header: ' ',
    cell(ctx) {
        return <div class="p-2 w-full text-center">{
            <Icon onClick={ctx.row.getToggleExpandedHandler()}>
                {
                    ctx.row.getCanExpand() ? (
                        ctx.row.getIsExpanded() ? <AiOutlineCaretDown></AiOutlineCaretDown> : <AiOutlineCaretRight></AiOutlineCaretRight>
                    ) : (
                        ' '
                    )
                }
            </Icon>

        }</div>
    },
    forceSorting: false,
    accessorFn(_, index) {
        return index
    }
} as ColumnDef<any>
