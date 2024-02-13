import type { Meta, StoryObj } from 'storybook-solidjs'

import { Splitter } from './index'

const meta = {
    title: 'Layout 布局组件/Splitter 拖拽区域',
    component: Splitter,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Splitter>

export default meta
type Story = StoryObj<typeof meta>

const Sample = () => {
    return (
        <Splitter>
            <div class="bg-blue-600" style="height: 300px">
                1
            </div>
            <div class="bg-green-600" style="height: 300px">
                2
            </div>
        </Splitter>
    )
}
/** 自动实现子代元素分割的组建 */
export const Primary: Story = {
    render: Sample,
    args: {}
}
