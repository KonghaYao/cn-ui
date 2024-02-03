import type { Meta, StoryObj } from 'storybook-solidjs'

import { Loading } from './index'
import { AC, resource, sleep } from '@cn-ui/reactive'
import { defineExampleAC } from '../lazyLoad/example/defineExampleAC'

const meta = {
    title: 'Utils/Loading',
    component: Loading,
    argTypes: {}
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

defineExampleAC()
import 'wc-spinners/src/index'
import { Flex } from '../container'
import { Col, Row } from '../RowAndCol'
import { For } from 'solid-js'
const list = [
    'atom-spinner',
    'breeding-rhombus-spinner',
    'circles-to-rhombuses-spinner',
    'fingerprint-spinner',
    'flower-spinner',
    'fulfilling-bouncing-circle-spinner',
    'fulfilling-square-spinner',
    'half-circle-spinner',
    'hollow-dots-spinner',
    'looping-rhombuses-spinner',
    'orbit-spinner',
    'pixel-spinner',
    'radar-spinner',
    'scaling-squares-spinner',
    'semipolar-spinner',
    'spring-spinner',
    'swapping-squares-spinner',
    'trinity-rings-spinner',
    'bar-spinner',
    'beat-spinner',
    'bounce-spinner',
    'circle-spinner',
    'climbing-box-spinner',
    'clip-spinner',
    'dot-spinner',
    'fade-spinner',
    'grid-spinner',
    'hash-spinner',
    'moon-spinner',
    'pacman-spinner',
    'propagate-spinner',
    'pulse-spinner',
    'ring-spinner',
    'rise-spinner',
    'rotate-spinner',
    'scale-spinner',
    'skew-spinner',
    'square-spinner',
    'sync-spinner',
    'rsc-circle-spinner',
    'default-spinner',
    'dual-ring-spinner',
    'ellipsis-spinner',
    'facebook-spinner',
    'rsc-grid-spinner',
    'heart-spinner',
    'hourglass-spinner',
    'orbitals-spinner',
    'ouroboro-spinner',
    'rsc-ring-spinner',
    'ripple-spinner',
    'roller-spinner',
    'spinner-spinner'
]
/**  */
export const Primary: Story = {
    render() {
        const res = resource(() => new Promise((resolve) => {}))
        return (
            <Row gutter="8px">
                <For each={list}>
                    {(item) => {
                        return (
                            <Col span={4}>
                                <AC
                                    resource={res}
                                    loading={() => {
                                        const el = document.createElement(item)
                                        el.id = item
                                        return (
                                            <Flex fill class="bg-gray-900 overflow-hidden aspect-square">
                                                {el}
                                            </Flex>
                                        )
                                    }}
                                >
                                    {() => 111}
                                </AC>
                            </Col>
                        )
                    }}
                </For>
            </Row>
        )
    },
    args: {}
}
