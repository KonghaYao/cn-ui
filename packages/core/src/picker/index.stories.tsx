import type { Meta, StoryObj } from 'storybook-solidjs'
import { AddressPicker } from './AddressPicker'
import { PickerColumn } from './PickerColumn'
import Mock from 'mockjs-ts'

const meta = {
    title: 'Data 数据展示/Picker 选择器',
    component: PickerColumn,
    argTypes: {}
} satisfies Meta<typeof PickerColumn>

export default meta
type Story = StoryObj<typeof meta>
import '@vant/touch-emulator'
import { atom, computed, genArray } from '@cn-ui/reactive'
import { SelectItemsType } from '../select'
import { Flex } from '../container'
import { For } from 'solid-js'

const mockData = () =>
    Mock.mock<{ data: SelectItemsType[] }>({
        'data|10': [
            {
                label: '@cname',
                value: '@name'
            }
        ]
    }).data

export const Primary: Story = {
    render() {
        const data = atom<SelectItemsType | null>(null)
        const options = mockData()
        return (
            <div>
                <div>
                    <PickerColumn v-model={data} options={options}></PickerColumn>
                </div>
                {data()?.label}
            </div>
        )
    },
    args: {}
}
export const Picker: Story = {
    render() {
        const data = genArray(3).map((i) => atom<SelectItemsType | null>(null))

        const options = [mockData(), mockData(), mockData()]
        return (
            <div>
                <Flex class="w-full">
                    <For each={options}>
                        {(option, index) => {
                            return <PickerColumn visibleOptionNum={3} class="flex-1" v-model={data[index()]} options={option}></PickerColumn>
                        }}
                    </For>
                </Flex>
                {data.map((i) => i()?.value)}
            </div>
        )
    },
    args: {}
}

export const _AddressPicker: Story = {
    render() {
        const data = atom<SelectItemsType[]>([])
        return (
            <>
                <AddressPicker v-model={data}></AddressPicker>
                {data().map((i) => i.label)}
            </>
        )
    },
    args: {}
}
