import type { Meta, StoryObj } from 'storybook-solidjs'

import { Split } from './index'

const meta = {
    title: 'Layout 布局组件/Split 拖拽区域',
    component: Split,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Split>

export default meta
type Story = StoryObj<typeof meta>

const Sample = () => {
    return (
        <Split>
            <div style="background: pink;height: 300px">1</div>
            <div style="background: green;height: 300px">2</div>
        </Split>
    )
}
/** 自动实现子代元素分割的组建 */
export const Primary: Story = {
    render: Sample,
    args: {}
}
