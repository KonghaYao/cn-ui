import type { Meta, StoryObj } from 'storybook-solidjs'

import { Popover, PopoverProps } from './index'
import { atom } from '@cn-ui/reactive'
import { For } from 'solid-js/web'
import { Row } from '../RowAndCol/Row'
import { Col } from '../RowAndCol'
import { Flex } from '../container/Flex'
import { CheckboxGroup } from '../checkbox'
import { Button } from '../button'

const meta = {
    title: 'Data 数据展示/Popover 弹出层',
    component: Popover,
    argTypes: {}
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const positions = [
            'top-start',
            'top',
            'top-end',
            'bottom',
            'right',
            'left',
            'bottom-start',
            'bottom-end',
            'right-start',
            'right-end',
            'left-start',
            'left-end'
        ] as const
        const trigger = atom(['click'])
        return (
            <Row gutter={20}>
                <Col span={24}>
                    <Flex gap={'12px'}>
                        <CheckboxGroup options={['click', 'hover', 'focus']} v-model={trigger} multiple={false}></CheckboxGroup>
                    </Flex>
                </Col>

                <For each={positions}>
                    {(position) => {
                        const open = atom(false)
                        return (
                            <Col span={6} class="h-48 py-4">
                                <Flex class="h-full bg-gray-100">
                                    <Popover
                                        content={<div>{position}</div>}
                                        v-model={open}
                                        placement={position}
                                        trigger={trigger()[0] as PopoverProps['trigger']}
                                    >
                                        <Button>{position}</Button>
                                    </Popover>
                                </Flex>
                            </Col>
                        )
                    }}
                </For>
            </Row>
        )
    },
    args: {}
}

export const Tooltips: Story = {
    render() {
        return (
            <Flex class="h-full bg-gray-100">
                <Popover disabled content={'12321323'} trigger={'hover'}>
                    <Button>按钮</Button>
                </Popover>
            </Flex>
        )
    },
    args: {}
}
