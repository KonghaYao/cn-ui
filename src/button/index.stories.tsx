import type { Meta, StoryObj } from 'storybook-solidjs'

import { Button } from './index'
import { Flex } from '../container/Flex'
const meta = {
    title: 'Common 通用/Button 按钮',
    component: Button
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**  */
export const Primary: Story = {
    name: 'Normal 正常渲染',
    render() {
        return (
            <Flex>
                <Button type="primary">按钮</Button>
            </Flex>
        )
    },
    args: {}
}
