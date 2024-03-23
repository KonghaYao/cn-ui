import Mock from 'mockjs-ts'
import { MagicTable } from '../Table'
import { ColumnDef } from '@tanstack/solid-table'

export type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    progress: number
    status: 'relationship' | 'complicated' | 'single'
    subRows?: Person[]
}

const range = (len: number) => {
    const arr: number[] = []
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr
}

export const newPerson = (): Person => {
    return Mock.mock({
        firstName: '@first',
        lastName: '@last',
        age: '@integer(20, 60)',
        visits: '@integer(500, 1500)',
        progress: '@integer(0, 100)',
        status: '@pick(["relationship", "complicated", "single"])'
    })
}

function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!
        return range(len).map((d): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}

export const Expanded = () => {
    const columns = [
        {
            header: 'Name',
            footer: (props) => props.column.id,
            columns: [
                {
                    accessorKey: 'firstName',
                    header: ({ table }) => (
                        <>
                            <button
                                {...{
                                    onClick: table.getToggleAllRowsExpandedHandler()
                                }}
                            >
                                {table.getIsAllRowsExpanded() ? '👇' : '👉'}
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
                                'padding-left': `${row.depth * 2}rem`
                            }}
                        >
                            {getValue()}
                        </div>
                    ),
                    footer: (props) => props.column.id
                },
                {
                    accessorFn: (row) => row.lastName,
                    id: 'lastName'
                }
            ]
        },
        {
            header: 'Info',
            footer: (props) => props.column.id,
            columns: [
                {
                    accessorKey: 'age',
                    header: () => 'Age',
                    footer: (props) => props.column.id
                },
                {
                    header: 'More Info',
                    columns: [
                        {
                            accessorKey: 'visits',
                            header: () => <span>Visits</span>,
                            footer: (props) => props.column.id
                        },
                        {
                            accessorKey: 'status',
                            header: 'Status',
                            footer: (props) => props.column.id
                        },
                        {
                            accessorKey: 'progress',
                            header: 'Profile Progress',
                            footer: (props) => props.column.id
                        }
                    ]
                }
            ]
        }
    ] satisfies ColumnDef<Person>[]
    const data = makeData(100, 5, 3)
    return (
        <>
            <MagicTable data={data} columns={columns} expandable selection></MagicTable>
        </>
    )
}
