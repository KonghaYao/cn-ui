import type { Meta, StoryObj } from 'storybook-solidjs'
import { MagicColumnConfig, MagicTable, MagicTableExpose } from './index'
import { random } from 'lodash-es'
import { NullAtom } from '@cn-ui/reactive'
import { ColumnGroups } from './example/ColumnGroups'
import { ColumnOrdering } from './example/ColumnOrdering'

const meta = {
    title: 'Data 数据展示/Table 表格组件',
    component: MagicTable,
    argTypes: {}
} satisfies Meta<typeof MagicTable>

export default meta
type Story = StoryObj<typeof meta>

const makeColumns = (num: number) =>
    [...Array(num)].map((_, i) => {
        return {
            accessorKey: i.toString(),
            header: 'Col ' + i.toString(),
            size: random(10, 100),
            minSize: 200, //enforced during column resizing
            maxSize: 500 //enforced during column resizing
        }
    }) as MagicColumnConfig<Record<string, string>>[]

const makeData = (num: number, columns: any[]): Record<string, string>[] =>
    [...Array(num).keys()].map((y) => ({
        ...Object.fromEntries(columns.map((col, x) => [col.accessorKey, [x, y].join('-')]))
    }))
export const Primary: Story = {
    name: '1000x1000',
    decorators: [
        (Story) => (
            <>
                <Story />
                <style>
                    {`html,body,#storybook-root {
                height:100%
            }`}
                </style>
            </>
        )
    ],
    render() {
        console.time('createData')
        const cols = makeColumns(1000)
        const data = makeData(1000, cols)
        console.timeEnd('createData')
        return <MagicTable columns={cols} data={data}></MagicTable>
    },
    args: {}
}
export const Selection: Story = {
    name: 'Selection and Index',
    decorators: Primary.decorators,
    render() {
        console.time('createData')
        const cols = makeColumns(100)
        const data = makeData(100, cols)
        console.timeEnd('createData')
        const expose = NullAtom<MagicTableExpose<Record<string, string>>>(null)
        return <MagicTable selection index columns={cols} data={data} expose={expose}></MagicTable>
    },
    args: {}
}
export const ColumnPinned: Story = {
    name: 'ColumnPinned 固定列',
    decorators: Primary.decorators,
    render() {
        console.time('createData')
        const cols = makeColumns(100)
        const data = makeData(100, cols)
        cols.slice(0, 5).forEach((i, index) => {
            i.sticky = index % 2 ? 'left' : 'right'
        })
        console.log(data)
        console.timeEnd('createData')
        const expose = NullAtom<MagicTableExpose<Record<string, string>>>(null)
        return <MagicTable columns={cols} data={data} expose={expose}></MagicTable>
    },
    args: {}
}
export const ColumnGroup: Story = {
    name: 'ColumnGroup 多级表头',
    decorators: Primary.decorators,
    render: ColumnGroups,
    args: {}
}
export const _ColumnOrdering: Story = {
    name: 'ColumnOrdering 列排序',
    decorators: Primary.decorators,
    render: ColumnOrdering,
    args: {}
}
