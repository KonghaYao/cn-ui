import type { Meta, StoryObj } from 'storybook-solidjs'

import { Select } from './index'
import { genArray } from '@cn-ui/reactive'
const meta = {
    title: 'Controls/Select 选择器',
    component: Select,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    name: 'Select 多选框',
    render() {
        return (
            <div class="flex gap-4">
                <Select
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
        return (
            <div class="flex gap-4">
                <Select
                    disabledOptions={['jack']}
                    multiple
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
                <Select multiple options={options}></Select>
            </div>
        )
    },
    args: {}
}
