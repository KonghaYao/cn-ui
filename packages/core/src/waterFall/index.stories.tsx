import type { Meta, StoryObj } from 'storybook-solidjs'

import { WaterFall } from './index'
import { photos } from './example/photos'

const meta = {
    title: 'Layout 布局组件/WaterFall 瀑布流',
    component: WaterFall,
    argTypes: {}
} satisfies Meta<typeof WaterFall>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        return (
            <WaterFall each={photos}>
                {(item) => {
                    return <img class="object-cover w-full" height={item.height} width={item.width} src={item.src}></img>
                }}
            </WaterFall>
        )
    },
    args: {}
}
