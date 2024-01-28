import type { Meta, StoryObj } from 'storybook-solidjs'

import { Collapse, CollapseProps } from './index'
import { atom } from '@cn-ui/reactive'
const meta = {
    title: 'Layout 数据展示/Collapse 折叠面板',
    component: Collapse,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Collapse>

export default meta
type Story = StoryObj<typeof meta>
export const Primary: Story = {
    render() {
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`
        const items: CollapseProps['items'] = [
            {
                key: '1',
                label: 'This is panel header 1',
                children: <p>{text}</p>
            },
            {
                key: '2',
                label: 'This is panel header 2',
                children: <p>{text}</p>
            },
            {
                key: '3',
                label: 'This is panel header 3',
                children: <p>{text}</p>
            }
        ]
        const active = atom<string[]>(['3'])
        return (
            <>
                <Collapse items={items} v-model={active}></Collapse>
            </>
        )
    },
    args: {}
}
