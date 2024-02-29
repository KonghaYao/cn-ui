import type { Meta, StoryObj } from 'storybook-solidjs'

import { UniverSheet } from '@cn-ui/univer/src/index'

const meta = {
    title: 'Navigation 导航/UniverSheet',
    component: UniverSheet,
    argTypes: {}
} satisfies Meta<typeof UniverSheet>

export default meta
type Story = StoryObj<typeof meta>

/**  */
export const Primary: Story = {
    render() {
        return (
            <div style={{ height: '400px' }}>
                <UniverSheet
                    class="h-full"
                    data={{
                        name: 'sheet1'
                    }}
                ></UniverSheet>
            </div>
        )
    },
    args: {}
}
