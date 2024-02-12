import type { Meta, StoryObj } from 'storybook-solidjs'

import { classNames, resource } from '@cn-ui/reactive'
import { Col, Row } from '../RowAndCol'
const meta = {
    title: 'Common 通用/Style 样式',
    component: () => null
} satisfies Meta<null>

export default meta
type Story = StoryObj<typeof meta>
import { colors } from './presets/colors'
import { Entries } from '@solid-primitives/keyed'
import { Flex } from '../container'
import * as copy from 'copy-to-clipboard'

/**  */
export const Primary: Story = {
    name: 'Color 色彩',
    render() {
        return (
            <div class="h-screen flex flex-col">
                <Row>
                    <Entries of={colors}>
                        {(colorName, value) => {
                            const isImportant = ['primary', 'success', 'warning', 'error', 'neutral'].includes(colorName)
                            return (
                                <Col span={6}>
                                    <Flex
                                        fill
                                        vertical
                                        class={classNames(isImportant && 'border-primary-400 border-2 p-4', 'bg-gray-50 rounded-lg ')}
                                        gap="4px"
                                    >
                                        {isImportant && <div>推荐使用</div>}
                                        <Entries of={value()}>
                                            {(num, value) => {
                                                if (num === 'DEFAULT') return null
                                                if (parseInt(num) < 50) return null
                                                const isLightText = parseInt(num) >= 600 || ['title', 'h1', 'h2'].includes(num)

                                                return (
                                                    <Flex
                                                        justify="space-between"
                                                        class={classNames(
                                                            'w-full cursor-pointer transition hover:-translate-x-4 rounded-md px-4 py-1 font-light text-sm',
                                                            `bg-${colorName}-${num}`,
                                                            isLightText && 'text-white'
                                                        )}
                                                        style={{
                                                            background: value()
                                                        }}
                                                        onclick={() => {
                                                            copy(`bg-${colorName}-${num}`)
                                                        }}
                                                    >
                                                        <span>{`bg-${colorName}-${num}`}</span>

                                                        <span>{value()}</span>
                                                    </Flex>
                                                )
                                            }}
                                        </Entries>
                                    </Flex>
                                </Col>
                            )
                        }}
                    </Entries>
                </Row>
            </div>
        )
    },
    args: {}
}
