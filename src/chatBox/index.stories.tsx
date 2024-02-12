import type { Meta, StoryObj } from 'storybook-solidjs'

import { ChatBox, ChatBoxMessage } from './index'
import { resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
const meta = {
    title: 'Data 数据展示/ChatBox 聊天窗口',
    component: ChatBox
} satisfies Meta<typeof ChatBox>

export default meta
type Story = StoryObj<typeof meta>

interface DataType {
    data: ChatBoxMessage[]
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
                <ChatBox
                    each={items()}
                    estimateSize={100}
                    onSendMessage={async (text) => {
                        const newMessage: ChatBoxMessage = {
                            id: Date.now().toString(),
                            message: text,
                            position: 'right'
                        }
                        items((i) => [newMessage, ...i])
                    }}
                ></ChatBox>
            </div>
        )
    },
    args: {}
}
