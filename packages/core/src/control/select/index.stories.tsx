import type { Meta, StoryObj } from 'storybook-solidjs'

import { Select, SelectItemsType } from './index'
import { genArray, resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
const meta = {
    title: 'Controls/Select 选择器',
    component: Select,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    name: 'Select 单选框',
    render() {
        return (
            <div class="flex gap-4">
                <Select
                    filterable
                    options={[
                        {
                            value: 'jack',
                            label: 'Jack'
                        },
                        {
                            value: 'lucy',
                            label: 'Lucy'
                        },
                        {
                            value: 'tom',
                            label: 'Tom'
                        }
                    ]}
                ></Select>
            </div>
        )
    },
    args: {}
}

export const Multi: Story = {
    name: 'Multiple 多选',
    render() {
        const res = resource(
            async () =>
                Mock.mock<{ data: SelectItemsType[] }>({
                    'data|10': [
                        {
                            value: '@name',
                            label: '@cname'
                        }
                    ]
                }).data,
            { initValue: [] }
        )
        return (
            <div class="flex gap-4">
                <Select disabledOptions={['jack']} multiple options={[{ label: 'Jack', value: 'jack' }, ...res()]}></Select>
            </div>
        )
    },
    args: {}
}

export const Search: Story = {
    name: 'Remote Search 远程搜索',
    render() {
        const res = resource(
            async () =>
                Mock.mock<{ data: SelectItemsType[] }>({
                    'data|10': [
                        {
                            value: '@name',
                            label: '@cname'
                        }
                    ]
                }).data,
            { initValue: [] }
        )

        return (
            <div class="flex flex-col gap-4">
                <Select options={res()} onInput={res.refetch}></Select>
            </div>
        )
    },
    args: {}
}

export const Virtual: Story = {
    name: 'Virtual 虚拟化',
    render() {
        const options = genArray(10000).map((i) => {
            return {
                value: 'jack' + i,
                label: 'Jack' + i
            }
        })
        return (
            <div class="flex gap-4">
                <Select filterable multiple options={options}></Select>
            </div>
        )
    },
    args: {}
}
