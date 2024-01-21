import type { Meta, StoryObj } from 'storybook-solidjs'

import { LazyLoad } from './index'
import { DefineAC, sleep } from '@cn-ui/reactive'

const meta = {
    title: 'Utils/LazyLoad',
    component: LazyLoad,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof LazyLoad>

export default meta
type Story = StoryObj<typeof meta>

DefineAC({
    loading: () => <div class="h-32 w-32 flex justify-center items-center bg-yellow-600">加载中</div>,
    error: () => <div class="h-32 w-32 flex justify-center items-center bg-rose-600">加载失败</div>
})

/**  */
export const Primary: Story = {
    render() {
        sleep
        return (
            <LazyLoad
                load={async () => {
                    await sleep(1000)
                    return import('./example/sample')
                }}
                loadKey="Sample"
            >
                <div class="h-32 w-32 flex justify-center items-center bg-purple-600">未加载</div>
            </LazyLoad>
        )
    },
    args: {}
}
