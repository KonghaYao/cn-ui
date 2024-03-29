import type { Meta, StoryObj } from 'storybook-solidjs'

import { Button, ButtonProps } from './index'
import { Flex } from '../container/Flex'
import { AiOutlineSearch } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import { toggleTheme } from '../utils/toggleTheme'
import { Component } from 'solid-js'
const meta = {
    title: 'Common 通用/Button 按钮',
    component: Button,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/**  */
export const Primary: Story = {
    name: 'Normal 正常渲染',
    render() {
        return (
            <Flex vertical gap="4px">
                <Flex gap="4px">
                    <Button type="primary" onclick={toggleTheme}>
                        按钮
                    </Button>
                    <Button onclick={toggleTheme}>按钮</Button>
                    <Button type="dashed" onclick={toggleTheme}>
                        按钮
                    </Button>
                    <Button type="link" onclick={toggleTheme}>
                        按钮
                    </Button>
                </Flex>
                <Flex gap="4px">
                    <Button type="primary" danger>
                        按钮
                    </Button>
                    <Button danger>按钮</Button>
                    <Button type="dashed" danger>
                        按钮
                    </Button>
                    <Button type="link" danger>
                        按钮
                    </Button>
                </Flex>
                <Flex gap="4px">
                    <Button type="primary" disabled>
                        按钮
                    </Button>
                    <Button disabled>按钮</Button>
                    <Button type="dashed" disabled>
                        按钮
                    </Button>
                    <Button type="link" disabled>
                        按钮
                    </Button>
                </Flex>
                <Flex gap="4px">
                    <Button type="primary" danger disabled>
                        按钮
                    </Button>
                    <Button danger disabled>
                        按钮
                    </Button>
                    <Button type="dashed" danger disabled>
                        按钮
                    </Button>
                    <Button type="link" danger disabled>
                        按钮
                    </Button>
                </Flex>
            </Flex>
        )
    },
    args: {}
}
export const IconBtn: Story = {
    name: 'Icon 模式',
    render() {
        const icon = () => (
            <Icon>
                <AiOutlineSearch></AiOutlineSearch>
            </Icon>
        )
        return (
            <Flex vertical gap="4px">
                <Flex gap="4px">
                    <Button type="primary" circle icon={icon()}></Button>
                    <Button circle icon={icon()}></Button>
                    <Button type="primary" circle danger icon={icon()}></Button>
                    <Button circle danger icon={icon()}></Button>
                </Flex>
            </Flex>
        )
    },
    args: {}
}
export const loading: Story = {
    name: 'Loading 模式',
    render() {
        const icon = () => (
            <Icon class="spinning">
                <AiOutlineSearch></AiOutlineSearch>
            </Icon>
        )
        return (
            <Flex vertical gap="4px">
                <Flex gap="4px">
                    <Button loading type="primary" circle icon={icon()}>
                        加载中
                    </Button>
                    <Button loading circle icon={icon()}>
                        加载中
                    </Button>
                    <Button loading type="primary" danger icon={icon()}></Button>
                    <Button loading danger icon={icon()}></Button>
                </Flex>
            </Flex>
        )
    },
    args: {}
}
