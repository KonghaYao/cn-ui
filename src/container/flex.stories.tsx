import type { Meta, StoryObj } from 'storybook-solidjs'

import { Flex } from './index'
import { atom } from '@cn-ui/reactive'
const meta = {
    title: 'Layout 布局组件/Flex 弹性布局',
    component: Flex,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>
const justifyOptions = [undefined, 'flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']

const alignOptions = [undefined, 'flex-start', 'center', 'flex-end', 'stretch', 'baseline']
export const Primary: Story = {
    render() {
        const justify = atom(justifyOptions[0])
        const alignItems = atom(alignOptions[0])
        return (
            <div class="h-24">
                <Flex gap="middle" align="start" vertical>
                    <p>Select justify :</p>
                    <select onChange={(e) => justify(e.target.value)}>
                        {justifyOptions.map((i) => {
                            return <option value={i}>{i}</option>
                        })}
                    </select>
                    <p>Select align :</p>
                    <select onChange={(e) => alignItems(e.target.value)}>
                        {alignOptions.map((i) => {
                            return <option value={i}>{i}</option>
                        })}
                    </select>
                    <Flex
                        style={{
                            width: '100%',
                            height: '120px',
                            'border-radius': '6px',
                            border: '1px solid #40a9ff'
                        }}
                        justify={justify()}
                        align={alignItems()}
                    >
                        <button class="bg-blue-200 min-w-7 h-8">1</button>
                        <button class="bg-blue-300 min-w-7 h-8">2</button>
                        <button class="bg-blue-400 min-w-7 h-8">3</button>
                        <button class="bg-blue-200 min-w-7 h-8">4</button>
                    </Flex>
                </Flex>
            </div>
        )
    },
    args: {}
}
