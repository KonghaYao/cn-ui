import type { Meta, StoryObj } from 'storybook-solidjs'

import { MagicTable } from './index'
import { ColumnDef } from '@tanstack/solid-table'

const meta = {
    title: 'Layout/Table 表格组件',
    component: MagicTable,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof MagicTable>

export default meta
type Story = StoryObj<typeof meta>

const makeColumns = (num: number) =>
    [...Array(num)].map((_, i) => {
        return {
            accessorKey: i.toString(),
            header: 'Col ' + i.toString(),
            size: 100,
            minSize: 50, //enforced during column resizing
            maxSize: 500 //enforced during column resizing
        } as ColumnDef<Record<string, string>>
    })

const makeData = (num: number, columns: { accessorKey: string }[]): Record<string, string>[] =>
    [...Array(num).keys()].map((y) => ({
        ...Object.fromEntries(columns.map((col, x) => [col.accessorKey, [x, y].join('-')]))
    }))
export const Primary: Story = {
    name: '1000x1000',
    render() {
        console.time('createData')
        const cols = makeColumns(1000)
        const data = makeData(100, cols)
        console.timeEnd('createData')
        return <MagicTable columns={cols} data={data}></MagicTable>
    },
    args: {}
}
