import type { Meta, StoryObj } from 'storybook-solidjs'

import { Alert, Message } from './index'
import { atom } from '@cn-ui/reactive'
import { createEffect } from 'solid-js'
import { Button } from '../button'

const meta = {
    title: 'Feedback 反馈组件/Alert 模态框',
    component: Alert,
    argTypes: {}
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom<{ name: string; id: string }[]>([], { equals: false })
        createEffect(() => {
            console.log(data())
        })

        return (
            <div class="flex flex-col gap-4">
                {(['success', 'error', 'warning', 'info'] as const).map((i) => {
                    return <Alert message="你好吗" type={i} closable icon></Alert>
                })}
                {(['success', 'error', 'warning', 'info'] as const).map((i) => {
                    return <Alert message="你好吗" type={i} closable icon round border></Alert>
                })}
                {(['success', 'error', 'warning', 'info'] as const).map((i) => {
                    return <Alert message="你好吗" type={i} closable icon round border description={Array(50).fill(i).join(',')}></Alert>
                })}
            </div>
        )
    },
    args: {}
}

export const MessageLog: Story = {
    render() {
        return (
            <div class="flex flex-col gap-4">
                {(['success', 'error', 'warning', 'info'] as const).map((i) => {
                    return <Button onclick={() => Message[i](i)}>{i}</Button>
                })}
            </div>
        )
    },
    args: {}
}
