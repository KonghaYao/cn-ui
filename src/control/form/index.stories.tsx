import type { Meta, StoryObj } from 'storybook-solidjs'

import { atom } from '@cn-ui/reactive'
import { FormCore, FormCoreRegister } from './FromCore'
import { Flex } from '../../container'
import { For } from 'solid-js'
import { FormInput } from '../input/FormInput'
import { FormSelect } from '../select/FormSelect'
import { Col, Row } from '../../RowAndCol'

const meta = {
    title: 'From/FormCore',
    component: FormCore,
    argTypes: {}
} satisfies Meta<typeof FormCore>

export default meta
type Story = StoryObj<typeof meta>

FormCoreRegister.register('text', FormInput, { allowSameRegister: true })
FormCoreRegister.register('select', FormSelect, { allowSameRegister: true })

export const Primary: Story = {
    name: 'Checkbox 多选框',
    render() {
        const data = atom(false)
        const configs = [
            { label: 'info', value: '32433', type: 'text' },
            {
                label: 'select',
                value: '32433',
                type: 'select',
                options: [
                    {
                        value: 'jack',
                        label: 'Jack'
                    },
                    {
                        value: 'lucy',
                        label: 'Lucy'
                    },
                    {
                        value: 'tom',
                        label: 'Tom'
                    }
                ]
            }
        ]
        return (
            <Row>
                <For each={configs}>
                    {(item) => {
                        return (
                            <Col span={6}>
                                <FormCore config={item}></FormCore>
                            </Col>
                        )
                    }}
                </For>
            </Row>
        )
    },
    args: {}
}
