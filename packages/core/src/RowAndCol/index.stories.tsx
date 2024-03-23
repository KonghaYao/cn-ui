import type { Meta, StoryObj } from 'storybook-solidjs'

import { Row, Col } from './index'

const meta = {
    title: 'Layout 布局组件/Grid 栅格布局',
    component: Row,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Row>

export default meta
type Story = StoryObj<typeof meta>
const commonClass = 'h-8 w-full rounded-md '
const rowClass = 'bg-gray-100 py-2 rounded-md '
export const Primary: Story = {
    render() {
        return (
            <div>
                <Row class={rowClass}>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={12}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
                <Row class={rowClass} justify="center">
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
                <Row class={rowClass} justify="end">
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
                <Row class={rowClass} justify="space-between">
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
                <Row class={rowClass} justify="space-around">
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
                <Row class={rowClass} justify="space-evenly">
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-200'} />
                    </Col>
                    <Col span={6}>
                        <div class={commonClass + ' bg-gray-300'} />
                    </Col>
                </Row>
            </div>
        )
    },
    args: {}
}

export const Responsive = {
    render() {
        return (
            <Row gutter={10}>
                <Col xs={8} sm={6} md={4} lg={3} xl={1}>
                    <div class={commonClass + ' bg-gray-300'} />
                </Col>
                <Col xs={4} sm={6} md={8} lg={9} xl={11}>
                    <div class={commonClass + ' bg-gray-200'} />
                </Col>
                <Col xs={4} sm={6} md={8} lg={9} xl={11}>
                    <div class={commonClass + ' bg-gray-300'} />
                </Col>
                <Col xs={8} sm={6} md={4} lg={3} xl={1}>
                    <div class={commonClass + ' bg-gray-200'} />
                </Col>
            </Row>
        )
    }
}
