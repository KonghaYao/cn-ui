import type { Meta, StoryObj } from 'storybook-solidjs'

import { BaseInput } from './index'
import { atom, useMapper } from '@cn-ui/reactive'

const meta = {
    title: 'Controls/BaseInput',
    component: BaseInput,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof BaseInput>

export default meta
type Story = StoryObj<typeof meta>
import { OcPersonfill2 } from 'solid-icons/oc'
import { Icon } from '../../icon/Icon'
export const Primary: Story = {
    render() {
        const data = atom('123232')
        return (
            <div class="flex gap-4">
                <BaseInput v-model={data}></BaseInput>
                <BaseInput v-model={data} disabled></BaseInput>
                <BaseInput v-model={data} suffixIcon={ClearControl}></BaseInput>
                <BaseInput
                    v-model={data}
                    prefixIcon={
                        <Icon>
                            <OcPersonfill2 size={16}></OcPersonfill2>
                        </Icon>
                    }
                ></BaseInput>
            </div>
        )
    },
    args: {}
}
export const Password: Story = {
    name: 'Password 密码',
    render() {
        const data = atom('123232')
        return (
            <div class="flex gap-4">
                <BaseInput v-model={data} type="password" suffixIcon={PasswordControl}></BaseInput>
                <BaseInput v-model={data} type="password" disabled suffixIcon={PasswordControl}></BaseInput>
            </div>
        )
    },
    args: {}
}
import { runes } from 'runes2'
import { ClearControl, PasswordControl } from './utils'

/** 右侧计数 */
export const Count: Story = {
    name: 'count 计数',
    render() {
        const data = atom('🔥🔥🔥')
        return (
            <div class="flex gap-4">
                <BaseInput v-model={data} count></BaseInput>
                <BaseInput
                    v-model={data}
                    count={{
                        show: true,
                        strategy: (txt) => runes(txt).length
                    }}
                ></BaseInput>
                <BaseInput
                    v-model={atom('Hello world')}
                    count={{
                        show: true,
                        max: 10
                    }}
                ></BaseInput>
                <BaseInput
                    v-model={atom('Hello world')}
                    count={{
                        show: true,
                        max: 10
                    }}
                    allowExceed
                ></BaseInput>

                <BaseInput
                    v-model={atom('🔥🔥🔥')}
                    count={{
                        show: true,
                        max: 6,
                        strategy: (txt) => runes(txt).length,
                        exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join('')
                    }}
                ></BaseInput>
            </div>
        )
    },
    args: {}
}
