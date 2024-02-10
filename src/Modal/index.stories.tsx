import type { Meta, StoryObj } from 'storybook-solidjs'

import { Modal } from './index'
import { atom } from '@cn-ui/reactive'
import { Flex } from '../container'
import Mock from 'mockjs-ts'
import { createEffect } from 'solid-js'

const meta = {
    title: 'Feedback 反馈组件/Modal 模态框',
    component: Modal,
    argTypes: {}
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom<{ name: string }[]>([], { equals: false })
        createEffect(() => {
            console.log(data())
        })
        return (
            <>
                <Flex>
                    <button
                        onclick={() =>
                            data((i) => {
                                i.unshift({ name: Mock.mock('@id') })
                                return i
                            })
                        }
                    >
                        修复
                    </button>
                </Flex>
                <Modal v-model={atom(true)} each={data()} by={(i) => i.name} position="bottom-right">
                    {(item, index) => {
                        return <div>{item.name}</div>
                    }}
                </Modal>
            </>
        )
    },
    args: {}
}
