import type { Meta, StoryObj } from 'storybook-solidjs'

import { MagicTable } from './index'

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
            header: 'Col ' + i.toString()
        }
    })

const makeData = (num: number, columns: { accessorKey: string }[]) =>
    [...Array(num).keys()].map((y) => ({
        ...Object.fromEntries(columns.map((col, x) => [col.accessorKey, [x, y].join('-')]))
    }))
export const Primary: Story = {
    render() {
        const cols = makeColumns(100)
        return <MagicTable columns={cols} data={makeData(100, cols)}></MagicTable>
    },
    args: {}
}
