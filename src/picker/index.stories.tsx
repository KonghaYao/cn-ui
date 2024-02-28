import type { Meta, StoryObj } from 'storybook-solidjs'

import { PickerColumn } from './PickerColumn'
import Mock from 'mockjs-ts'

const meta = {
    title: 'Data 数据展示/Picker 选择器',
    component: PickerColumn,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof PickerColumn>

export default meta
type Story = StoryObj<typeof meta>
import '@vant/touch-emulator'
import { atom } from '@cn-ui/reactive'
export const Primary: Story = {
    render() {
        const data = atom(null)
        const options = Mock.mock({
            'data|10': [
                {
                    label: '@cname',
                    value: '@name'
                }
            ]
        })
        return (
            <div>
                <div>
                    <PickerColumn optionHeight={44} v-model={data} visibleOptionNum={6} swipeDuration={1000} options={options.data}></PickerColumn>
                </div>
                {data()?.label}
            </div>
        )
    },
    args: {}
}
