import type { Meta, StoryObj } from 'storybook-solidjs'

import { VirtualList } from './index'
import { atom, ArrayFolder } from '@cn-ui/reactive'

const meta = {
    title: 'Data 数据展示/VirtualList 虚拟列表',
    component: VirtualList,
    argTypes: {}
} satisfies Meta<typeof VirtualList>

export default meta
type Story = StoryObj<typeof meta>

/**  */
export const Primary: Story = {
    name: 'ListRender 列表渲染',
    render() {
        const items = atom([...Array(100000).keys()])
        return (
            <div class="h-screen flex flex-col">
                <div class="h-24">
                    Total: <span>{items().length.toLocaleString()}</span>
                </div>
                <VirtualList each={items()} estimateSize={24}>
                    {(item, index) => {
                        return <div class="h-6 bg-gray-100">{item}</div>
                    }}
                </VirtualList>
            </div>
        )
    },
    args: {}
}
export const GridRender: Story = {
    name: 'GridRender 网格渲染',
    render() {
        const cellsSize = 100000
        const items = atom(ArrayFolder([...Array(cellsSize).keys()]))
        return (
            <div class="h-screen flex flex-col">
                <div class="h-24">
                    {items().length.toLocaleString()} Rows {cellsSize} Cells
                </div>
                <VirtualList each={items()} estimateSize={24}>
                    {(item, index) => {
                        return (
                            <div class="h-6 bg-gray-100 grid-cols-10 grid">
                                {item.map((i) => {
                                    return <div>{i}</div>
                                })}
                            </div>
                        )
                    }}
                </VirtualList>
            </div>
        )
    },
    args: {}
}
