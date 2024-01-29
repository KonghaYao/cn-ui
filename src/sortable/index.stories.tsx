import type { Meta, StoryObj } from 'storybook-solidjs'

import { SortableList } from './index'
import { atom } from '@cn-ui/reactive'

const meta = {
    title: 'Layout 布局组件/Sortable 拖拽排序',
    component: SortableList,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof SortableList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom([
            {
                id: '223232',
                label: 'info'
            },
            {
                id: '111',
                label: 'info1'
            },
            {
                id: '222',
                label: 'info2'
            }
        ])
        return (
            <SortableList
                each={data}
                getId={(item) => {
                    return item['label']
                }}
            >
                {(item) => {
                    return <button>{item.label}</button>
                }}
            </SortableList>
        )
    },
    args: {}
}
