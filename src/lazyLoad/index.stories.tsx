import type { Meta, StoryObj } from 'storybook-solidjs'

import { LazyLoad } from './index'
import { sleep } from '@cn-ui/reactive'
import { defineExampleAC } from './example/defineExampleAC'

const meta = {
    title: 'Utils/LazyLoad',
    component: LazyLoad,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof LazyLoad>

export default meta
type Story = StoryObj<typeof meta>

defineExampleAC()

/**  */
export const Primary: Story = {
    render() {
        sleep
        return (
            <LazyLoad
                load={async () => {
                    await sleep(500)
                    return import('./example/sample')
                }}
                loadKey="Sample"
            ></LazyLoad>
        )
    },
    args: {}
}
