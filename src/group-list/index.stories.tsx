import type { Meta, StoryObj } from 'storybook-solidjs'

import { CommonGroupListConfig, GroupList } from './index'
import { AiFillAccountBook, AiOutlineAccountBook } from 'solid-icons/ai'

const meta = {
    title: 'Controls/GroupList 分组列表',
    component: GroupList,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof GroupList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
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
                        label: 'Tom'
                    },
                    {
                        value: 'tom',
                        label: 'Tom'
                    },
                    {
                        value: 'tom',
                        label: 'Tom'
                    }
                ]
            },

        ] as CommonGroupListConfig[]
        return (
            <div class="flex gap-4">
                <GroupList
                    options={options}
                ></GroupList>
                <GroupList
                    fold
                    options={options}
                ></GroupList>
            </div>
        )
    },
    args: {}
}
