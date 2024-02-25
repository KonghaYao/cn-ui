import type { Meta, StoryObj } from 'storybook-solidjs'

import { InputNumber } from './index'
import { atom } from '@cn-ui/reactive'
import { Button } from '../../button'
import { BaseInput } from '../input/BaseInput'

const meta = {
    title: 'Controls/InputNumber',
    component: InputNumber,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof InputNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom(123232)
        return (
            <div class="flex gap-4">
                <div>{data()}</div>
                <InputNumber min={0} v-model={data} controls></InputNumber>
            </div>
        )
    },
    args: {}
}

export const Disabled: Story = {
    name: 'Disabled',
    render() {
        const data = atom(123232)
        const disabled = atom(true)
        return (
            <div class="flex gap-4">
                <Button type="primary" onclick={() => disabled((i) => !i)}>
                    Toggle Disabled
                </Button>
                <InputNumber disabled={disabled()} min={0} v-model={data} controls></InputNumber>
            </div>
        )
    },
    args: {}
}
export const allowMouseWheel: Story = {
    name: 'MouseWheel',
    render() {
        const data = atom(200)
        return (
            <div class="flex gap-4">
                <InputNumber allowMouseWheel min={0} max={100} v-model={data}></InputNumber>
            </div>
        )
    },
    args: {}
}
export const precision: Story = {
    name: 'Precision',
    render() {
        const data = atom(200)
        return (
            <div class="flex gap-4">
                <InputNumber allowMouseWheel precision={4} step={0.0001} min={0} max={100} v-model={data}></InputNumber>
            </div>
        )
    },
    args: {}
}
