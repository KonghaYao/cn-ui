import Mock from "mockjs-ts";
import { MagicTable } from "../Table";
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
export const newPerson = () => {
    return {
        firstName: "@first",
        lastName: "@last",
        age: "@integer(20, 60)",
        visits: "@integer(500, 1500)",
        progress: "@integer(0, 100)",
        "status|1": ["relationship", "complicated", "single"],
    };
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

export const Expanded = () => {
    const columns = [
        {
            header: "Name",
            footer: (props) => props.column.id,
            columns: [
                {
                    accessorKey: "firstName",
                    header: ({ table }) => (
                        <>
                            <button
                                {...{
                                    onClick: table.getToggleAllRowsExpandedHandler(),
                                }}
                            >
                                {table.getIsAllRowsExpanded() ? "👇" : "👉"}
                            </button>
                            First Name
                        </>
                    ),
                    cell: ({ row, getValue }) => (
                        <div
                            style={{
                                // Since rows are flattened by default,
                                // we can use the row.depth property
                                // and paddingLeft to visually indicate the depth
                                // of the row
                                "padding-left": `${row.depth * 2}rem`,
                            }}
                        >
                            {getValue()}
                        </div>
                    ),
                    footer: (props) => props.column.id,
                },
                {
                    accessorFn: (row) => row.lastName,
                    id: "lastName",
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
    ] satisfies ColumnDef<Person>[];
    const data = makeData(20, 5, 3);
    console.log(data);
    return (
        <>
            <MagicTable data={data} columns={columns} expandable selection />
        </>
    );
};
