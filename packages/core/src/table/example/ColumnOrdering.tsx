import { NullAtom, computed } from "@cn-ui/reactive";
import { SortableList } from "@cn-ui/sortable";
import Mock from "mockjs-ts";
import { Show } from "solid-js";
import { MagicTable, type MagicTableExpose } from "..";
import { Checkbox } from "../../checkbox";
import type { ColumnDef } from "../solidTable";

export type Person = {
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: "relationship" | "complicated" | "single";
    subRows?: Person[];
};

const newPerson = (): Person => {
    return Mock.mock({
        firstName: "@first",
        lastName: "@last",
        age: "@integer(20, 60)",
        visits: "@integer(0, 1000)",
        progress: "@integer(0, 100)",
        "status|+1": ["relationship", "complicated", "single"],
    });
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!;
        return Mock.mock<{ data: Person[] }>({
            [`data|${len}`]: [newPerson()],
        }).data.map((p) => {
            return {
                ...p,
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            };
        });
    };

    return makeDataLevel();
}

const defaultColumns: ColumnDef<Person>[] = [
    {
        header: "Name",
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: "firstName",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
            {
                accessorFn: (row) => row.lastName,
                id: "lastName",
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id,
            },
        ],
    },
    {
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: "age",
                header: () => "Age",
                footer: (props) => props.column.id,
            },
            {
                header: "More Info",
                columns: [
                    {
                        accessorKey: "visits",
                        header: () => <span>Visits</span>,
                        footer: (props) => props.column.id,
                    },
                    {
                        accessorKey: "status",
                        header: "Status",
                        footer: (props) => props.column.id,
                    },
                    {
                        accessorKey: "progress",
                        header: "Profile Progress",
                        footer: (props) => props.column.id,
                    },
                ],
            },
        ],
    },
];

export const ColumnOrdering = () => {
    const tableExpose = NullAtom<MagicTableExpose<unknown>>(null);
    const cols = computed(() => tableExpose()?.table.getAllLeafColumns() ?? []);
    return (
        <>
            <Show when={tableExpose()}>
                <div class="px-1 border-b border-black">
                    <Checkbox
                        label="Toggle All"
                        value=""
                        v-model={() => tableExpose()!.table.getIsAllColumnsVisible()}
                        onChange={tableExpose()!.table.getToggleAllColumnsVisibilityHandler()}
                    />
                </div>
                <SortableList
                    v-model={cols}
                    class="flex "
                    onSorted={() => tableExpose()?.columnOrder(cols().map((c) => c.id))}
                >
                    {(column) => {
                        return (
                            <div class="px-1">
                                <label>
                                    <input
                                        {...{
                                            type: "checkbox",
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler(),
                                        }}
                                    />{" "}
                                    {column.id}
                                </label>
                            </div>
                        );
                    }}
                </SortableList>
            </Show>

            <MagicTable
                data={makeData(20)}
                height={400}
                columns={defaultColumns}
                expose={tableExpose}
            />
        </>
    );
};
