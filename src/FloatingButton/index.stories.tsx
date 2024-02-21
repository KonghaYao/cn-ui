import type { Meta, StoryObj } from 'storybook-solidjs'

import { FloatingButton, FloatingButtonGroup, FloatingButtonProps } from './index'
import { Flex } from '../container/Flex'
import { AiFillHighlight, AiOutlineAccountBook, AiOutlineAlert, AiOutlinePlus, AiOutlinePullRequest, AiOutlineSearch } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import { toggleTheme } from '../utils/toggleTheme'
import { Button } from '../button'
import { atom } from '@cn-ui/reactive'

const meta = {
    title: 'Common 通用/FloatingButton 按钮',
    component: FloatingButton,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof FloatingButton>

export default meta
type Story = StoryObj<typeof meta>

/**  */
export const Primary: Story = {
    name: 'Normal 正常渲染',
    render() {
        return (
            <Flex vertical gap="4px">
                <FloatingButton onClick={toggleTheme}>
                    <Icon>
                        <AiOutlineSearch />
                    </Icon>
                </FloatingButton>
            </Flex>
        )
    },
    args: {}
}
export const Group: Story = {
    name: 'Group 群组渲染',
    render() {
        const options = [
            {
                children: (
                    <Icon>
                        <AiOutlineSearch />
                    </Icon>
                )
            },
            {
                children: (
                    <Icon>
                        <AiOutlineAccountBook />
                    </Icon>
                )
            },
            {
                children: (
                    <Icon>
                        <AiOutlineAlert />
                    </Icon>
                )
            }
        ] as FloatingButtonProps[]
        const show = atom(true)
        return (
            <>
                <Button onclick={() => show((i) => !i)}>{show() ? 'True' : 'False'}</Button>
                <FloatingButtonGroup
                    v-model={show}
                    options={options}
                    icon={{
                        children: (
                            <Icon>
                                <AiOutlinePlus />
                            </Icon>
                        )
                    }}
                ></FloatingButtonGroup>
            </>
        )
    },
    args: {}
}
