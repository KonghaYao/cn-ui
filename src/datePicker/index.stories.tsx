import type { Meta, StoryObj } from 'storybook-solidjs'

import { DatePanel } from './index'
import { atom } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
import { createEffect } from 'solid-js'
import { GlobalDialog } from './useGlobalDialog'
import { AiOutlineClose } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import { Button } from '../button'

const meta = {
    title: 'Controls/DatePanel 日期选择',
    component: DatePanel,
    argTypes: {}
} satisfies Meta<typeof DatePanel>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        return (
            <>
                <DatePanel></DatePanel>
            </>
        )
    },
    args: {}
}
