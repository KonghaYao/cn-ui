import type { Meta, StoryObj } from 'storybook-solidjs'

import { DatePanel } from './index'
import { atom } from '@cn-ui/reactive'

const meta = {
    title: 'Controls/DatePanel 日期选择',
    component: DatePanel,
    argTypes: {}
} satisfies Meta<typeof DatePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const date = atom([])
        return (
            <>
                {date().map((i) => i)}
                <DatePanel v-model={date}></DatePanel>
            </>
        )
    },
    args: {}
}
