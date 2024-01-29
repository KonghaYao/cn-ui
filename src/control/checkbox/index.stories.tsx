import type { Meta, StoryObj } from 'storybook-solidjs'

import { Checkbox, CheckboxGroup, CheckboxGroupExpose, useControlCheckbox } from './index'
import { Atom, NullAtom, atom, computed } from '@cn-ui/reactive'
import { Flex } from '../../container/Flex'
import { watch } from 'solidjs-use'

const meta = {
    title: 'Controls/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom(false)
        return (
            <div class="flex gap-4">
                <Checkbox v-model={data} label={'恭喜发财'} value={'2333'}></Checkbox>

                {data() ? '选中' : '未选中'}
            </div>
        )
    },
    args: {}
}
const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: false }
]

export const Group: Story = {
    render() {
        const checkBoxCtx = NullAtom<CheckboxGroupExpose>(null)

        const { indeterminate, isAllChecked, onChange } = useControlCheckbox(checkBoxCtx)
        return (
            <div class="flex gap-4">
                <Checkbox indeterminate={indeterminate()} v-model={isAllChecked} label={'切换选中'} value={'2333'} onChange={onChange}></Checkbox>
                <CheckboxGroup options={optionsWithDisabled} expose={checkBoxCtx}></CheckboxGroup>
            </div>
        )
    },
    args: {}
}
