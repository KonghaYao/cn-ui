import { ColumnDef } from '@tanstack/solid-table'
import { MagicTable, MagicTableExpose } from '../Table'
import Mock from 'mockjs-ts'
import { NullAtom } from '@cn-ui/reactive'
import { Show } from 'solid-js'

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

const newPerson = (): Person => {
    const statusOptions = ['relationship', 'complicated', 'single']
    return {
        firstName: Mock.mock('@first'),
        lastName: Mock.mock('@last'),
        age: Mock.mock('@integer(20, 60)'),
        visits: Mock.mock('@integer(0, 1000)'),
        progress: Mock.mock('@integer(0, 100)'),
        status: Mock.Random.pick(statusOptions)
    }
}

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Person[] => {
        const len = lens[depth]!
        return range(len).map((): Person => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
            }
        })
    }

    return makeDataLevel()
}

const defaultColumns: ColumnDef<Person>[] = [
    {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
            {
                accessorKey: 'firstName',
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id
            },
            {
                accessorFn: (row) => row.lastName,
                id: 'lastName',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id
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
]

export const ColumnOrdering = () => {
    const tableExpose = NullAtom<MagicTableExpose<unknown>>(null)
    return (
        <>
            <Show when={tableExpose()}>
                <div class="px-1 border-b border-black">
                    <label>
                        <input
                            {...{
                                type: 'checkbox',
                                checked: tableExpose()!.table.getIsAllColumnsVisible(),
                                onChange: tableExpose()!.table.getToggleAllColumnsVisibilityHandler()
                            }}
                        />{' '}
                        Toggle All
                    </label>
                </div>
                {tableExpose()!
                    .table.getAllLeafColumns()
                    .map((column) => {
                        return (
                            <div class="px-1">
                                <label>
                                    <input
                                        {...{
                                            type: 'checkbox',
                                            checked: column.getIsVisible(),
                                            onChange: column.getToggleVisibilityHandler()
                                        }}
                                    />{' '}
                                    {column.id}
                                </label>
                            </div>
                        )
                    })}
            </Show>

            <MagicTable data={makeData(20)} height={400} columns={defaultColumns} expose={tableExpose}></MagicTable>
        </>
    )
}
