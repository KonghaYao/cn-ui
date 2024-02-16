import { createColumnHelper } from '@tanstack/solid-table'
import { MagicTable } from '../Table'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10
    }
]

const columnHelper = createColumnHelper<Person>()

const columns = [
    columnHelper.group({
        id: 'hello',
        header: () => <span>Hello</span>,
        // footer: props => props.column.id,
        columns: [
            columnHelper.accessor('firstName', {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id
            }),
            columnHelper.accessor((row) => row.lastName, {
                id: 'lastName',
                cell: (info) => info.getValue(),
                header: () => <span>Last Name</span>,
                footer: (props) => props.column.id
            })
        ]
    }),
    columnHelper.group({
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
            columnHelper.accessor('age', {
                header: () => 'Age',
                footer: (props) => props.column.id
            }),
            columnHelper.group({
                header: 'More Info',
                columns: [
                    columnHelper.accessor('visits', {
                        header: () => <span>Visits</span>,
                        footer: (props) => props.column.id
                    }),
                    columnHelper.accessor('status', {
                        header: 'Status',
                        footer: (props) => props.column.id
                    }),
                    columnHelper.accessor('progress', {
                        header: 'Profile Progress',
                        footer: (props) => props.column.id
                    })
                ]
            })
        ]
    })
]

export const ColumnGroups = () => {
    return <MagicTable data={defaultData} columns={columns}></MagicTable>
}
