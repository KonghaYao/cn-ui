import type { Meta, StoryObj } from 'storybook-solidjs'

import { CommonGroupListConfig, GroupList } from './index'
import { AiOutlineAccountBook } from 'solid-icons/ai'

const meta = {
    title: 'Data 数据展示/GroupList 分组列表',
    component: GroupList,
    argTypes: {}
} satisfies Meta<typeof GroupList>

export default meta
type Story = StoryObj<typeof meta>
export const Fold: Story = {
    name: 'GroupList 分组列表',
    render() {
        const options = [
            {
                value: 'jack',
                label: 'Jack',
                icon: () => <AiOutlineAccountBook></AiOutlineAccountBook>
            },
            {
                value: 'lucy',
                label: 'Lucy',
                withSeparate: true
            },
            {
                value: 'tom',
                label: 'Tom',
                options: [
                    {
                        value: 'tom',
                        label: 'Tom1',
                        options: [
                            {
                                value: 'jack',
                                label: 'Jack',
                                icon: () => <AiOutlineAccountBook></AiOutlineAccountBook>
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                                withSeparate: true
                            },
                            {
                                value: 'tom',
                                label: 'Tom2'
                            },
                            {
                                value: 'tom',
                                label: 'Tom3'
                            }
                        ]
                    },
                    {
                        value: 'tom',
                        label: 'Tom2'
                    },
                    {
                        value: 'tom',
                        label: 'Tom3'
                    }
                ]
            }
        ] as CommonGroupListConfig[]
        return (
            <div class="flex gap-4">
                <GroupList
                    trigger="hover"
                    options={options}
                    open={(item) => {
                        return item.level! <= 2
                    }}
                ></GroupList>
            </div>
        )
    },
    args: {}
}

export const Primary: Story = {
    name: 'unfoldList 列表',
    render() {
        const options = [
            {
                value: 'jack',
                label: 'Jack',
                icon: () => <AiOutlineAccountBook></AiOutlineAccountBook>
            },
            {
                value: 'lucy',
                label: 'Lucy',
                withSeparate: true
            },
            {
                value: 'tom',
                label: 'Tom',
                options: [
                    {
                        value: 'tom',
                        label: 'Tom1',
                        options: [
                            {
                                value: 'jack',
                                label: 'Jack',
                                icon: () => <AiOutlineAccountBook></AiOutlineAccountBook>
                            },
                            {
                                value: 'lucy',
                                label: 'Lucy',
                                withSeparate: true
                            },
                            {
                                value: 'tom',
                                label: 'Tom2'
                            },
                            {
                                value: 'tom',
                                label: 'Tom3'
                            }
                        ]
                    },
                    {
                        value: 'tom',
                        label: 'Tom2'
                    },
                    {
                        value: 'tom',
                        label: 'Tom3'
                    }
                ]
            }
        ] as CommonGroupListConfig[]
        return (
            <div class="flex gap-4">
                <GroupList unfold options={options}></GroupList>
            </div>
        )
    },
    args: {}
}
