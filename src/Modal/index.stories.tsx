import type { Meta, StoryObj } from 'storybook-solidjs'

import { Modal } from './index'
import { atom } from '@cn-ui/reactive'

const meta = {
    title: 'Feedback 反馈组件/Modal 模态框',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        return <Modal v-model={atom(true)}></Modal>
    },
    args: {}
}
