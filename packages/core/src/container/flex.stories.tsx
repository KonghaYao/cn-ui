import type { Meta, StoryObj } from 'storybook-solidjs'

import { Flex } from './index'
import { atom } from '@cn-ui/reactive'
import { Select } from '../control/select'
const meta = {
    title: 'Layout 布局组件/Flex 弹性布局',
    component: Flex,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>
const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']

const alignOptions = ['flex-start', 'center', 'flex-end', 'stretch', 'baseline']
export const Primary: Story = {
    render() {
        const justify = atom(['center'])
        const alignItems = atom(['center'])
        return (
            <div class="h-24">
                <Flex gap="middle" align="start" vertical>
                    <Flex
                        style={{
                            width: '100%',
                            height: '120px',
                            'border-radius': '6px',
                            border: '1px solid #40a9ff'
                        }}
                        justify={justify()[0]}
                        align={alignItems()[0]}
                    >
                        <div class="bg-blue-200 min-w-7 h-8">1</div>
                        <div class="bg-blue-300 min-w-7 h-8">2</div>
                        <div class="bg-blue-400 min-w-7 h-8">3</div>
                        <div class="bg-blue-200 min-w-7 h-8">4</div>
                    </Flex>
                    <p>Select justify :</p>
                    <Select options={justifyOptions.map((i) => ({ label: i, value: i }))} v-model={justify}></Select>
                    <p>Select align :</p>
                    <Select options={alignOptions.map((i) => ({ label: i, value: i }))} v-model={alignItems}></Select>
                </Flex>
            </div>
        )
    },
    args: {}
}
