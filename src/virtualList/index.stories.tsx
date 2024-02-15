import type { Meta, StoryObj } from 'storybook-solidjs'

import { VirtualList } from './VirtualList'
import { atom, ArrayFolder, resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
import { VirtualGrid } from './VirtualGrid'
const meta = {
    title: 'Data 数据展示/VirtualList 虚拟列表',
    component: VirtualList
} satisfies Meta<typeof VirtualList>

export default meta
type Story = StoryObj<typeof meta>

interface DataType {
    data: string[]
}
/**  */
export const Primary: Story = {
    name: 'ListRender 列表渲染',
    render() {
        const cellsSize = 100 * 1000
        const items = atom(ArrayFolder([...Array(cellsSize).keys()], 100))
        return (
            <div class="h-screen flex flex-col">
                <div class="h-24">100x1000</div>
                <VirtualList each={items()} estimateSize={24}>
                    {(item, index, { itemClass }) => {
                        return (
                            <div class="h-6 bg-gray-100 flex">
                                {item.map((i) => {
                                    return <div class="w-24 flex-none">{i}</div>
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
export const GridRender: Story = {
    name: 'GridRender 网格渲染',
    render() {
        const cellsSize = 1000 * 1000
        const items = atom(ArrayFolder([...Array(cellsSize).keys()], 1000))
        return (
            <div class="h-screen flex flex-col">
                <div class="h-24">1000x1000</div>
                <VirtualGrid each={items()}>
                    {(item) => {
                        return <div class="w-24 h-6 flex-none">{item}</div>
                    }}
                </VirtualGrid>
            </div>
        )
    },
    args: {}
}
