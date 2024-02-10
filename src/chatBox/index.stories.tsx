import type { Meta, StoryObj } from 'storybook-solidjs'

import { ChatBox } from './index'
import { atom, ArrayFolder, resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
const meta = {
    title: 'Data 数据展示/ChatBox 聊天窗口',
    component: ChatBox
} satisfies Meta<typeof ChatBox>

export default meta
type Story = StoryObj<typeof meta>

interface DataType {
    data: {
        id: string
        title: string
        message: string
    }[]
}
/**  */
export const Primary: Story = {
    name: 'ListRender 列表渲染',
    render() {
        const items = resource(
            async () =>
                Mock.mock<DataType>({
                    'data|50': [
                        {
                            id: '@id',
                            title: '@title',
                            message: '@sentence'
                        }
                    ]
                }).data,
            { initValue: [] }
        )
        return (
            <div class="h-screen flex flex-col">
                <ChatBox each={items()} estimateSize={48}></ChatBox>
            </div>
        )
    },
    args: {}
}
