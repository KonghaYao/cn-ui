import { computed } from "@cn-ui/reactive";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "solid-icons/ai";
import { Checkbox } from "../checkbox";
import { Icon } from "../icon/Icon";
import type { ColumnDef } from "./solidTable";

export const selectionConfig = {
    id: "$select",
    size: 48,
    header: ({ table }) => {
        return (
            <div class="px-2">
                <Checkbox
                    aria-label={"Select All Rows"}
                    label=""
                    value=""
                    v-model={() => table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            </div>
        );
    },
    enableResizing: false,
    cell: (props) => {
        const checked = computed(() => props.row.getIsSelected());
        return (
            <div class="p-2">
                <Checkbox
                    aria-label={`${!checked() ? "Select" : "Unselect"} Row ${props.row.index + 1}`}
                    v-model={checked}
                    label=""
                    value=""
                    disabled={!props.row.getCanSelect()}
                    onChange={props.row.getToggleSelectedHandler()}
                />
            </div>
        );
    },
    fixed: "left",
} as ColumnDef<any>;

export const indexConfig = {
    id: "$index",
    size: 60,
    header: "#",
    cell(ctx) {
        return <div class="p-2 w-full text-center">{ctx.row.index + 1}</div>;
    },
    fixed: "left",
    enableResizing: false,
    forceSorting: true,
    accessorFn(_, index) {
        return index;
    },
} as ColumnDef<any>;

export const expandingConfig = {
    id: "$expanding",
    size: 48,
    header: " ",
    enableResizing: false,
    cell(ctx) {
        return (
            <div class="p-2 w-full text-center">
                {
                    <Icon onClick={ctx.row.getToggleExpandedHandler()} class="cursor-pointer">
                        {ctx.row.getCanExpand() ? (
                            ctx.row.getIsExpanded() ? (
                                <AiOutlineCaretDown class="fill-primary-600" />
                            ) : (
                                <AiOutlineCaretRight class="fill-primary-600" />
                            )
                        ) : (
                            " "
                        )}
                    </Icon>
                }
            </div>
        );
    },
    forceSorting: false,
    accessorFn(_, index) {
        return index;
    },
} as ColumnDef<any>;
