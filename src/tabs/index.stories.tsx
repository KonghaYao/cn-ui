import type { Meta, StoryObj } from 'storybook-solidjs'

import { Tab, Tabs } from './index'
import { atom, sleep } from '@cn-ui/reactive'
import { Center } from '../container'
import { LazyLoad } from '../lazyLoad'
import { defineExampleAC } from '../lazyLoad/example/defineExampleAC'

const meta = {
    title: 'Navigation 导航/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

defineExampleAC()

/**  */
export const Primary: Story = {
    render() {
        const model = atom('12393892')
        return (
            <Tabs v-model={model}>
                {['342343', '12334324', '12393892'].map((i) => {
                    return (
                        <Tab name={i}>
                            <Center>{i}</Center>
                        </Tab>
                    )
                })}
                <Tab name="lazyload">
                    <LazyLoad load={() => import('../lazyLoad/example/sample')} loadKey="Sample"></LazyLoad>
                </Tab>
            </Tabs>
        )
    },
    args: {}
}
