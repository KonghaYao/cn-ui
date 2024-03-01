import type { Meta, StoryObj } from 'storybook-solidjs'

import { ObjectAtom, StoreToAtom, atom } from '@cn-ui/reactive'
import { FormCore, FormCoreRegister } from './FromCore'
import { For } from 'solid-js'
import { FormInput } from '../input/FormInput'
import { FormSelect } from '../select/FormSelect'
import { Col, Row } from '../../RowAndCol'
import { createStore } from 'solid-js/store'
import { JSONViewer } from '../../dataViewer'
import { FormRadio } from '../checkbox/FormRadio'
import { FormCheckBox } from '../checkbox/FormCheckBox'

const meta = {
    title: 'From/FormCore',
    component: FormCore,
    argTypes: {}
} satisfies Meta<typeof FormCore>

export default meta
type Story = StoryObj<typeof meta>

FormCoreRegister.register('text', FormInput, { allowSameRegister: true })
FormCoreRegister.register('select', FormSelect, { allowSameRegister: true })
FormCoreRegister.register('radio', FormRadio, { allowSameRegister: true })
FormCoreRegister.register('checkbox', FormCheckBox, { allowSameRegister: true })

export const Primary: Story = {
    name: 'Checkbox 多选框',
    render() {
        const configs = [
            { label: 'info', value: 'info', type: 'text' },
            {
                label: 'select',
                value: 'select',
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
            },
            {
                label: 'checkbox',
                value: 'checkbox',
                type: 'checkbox',
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
                ],
                span: 24
            },
            {
                label: 'radio',
                value: 'radio',
                type: 'radio',
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
                ],
                span: 24
            }
        ]
        const [obj, setObj] = createStore({
            select: 'tom'
        })
        return (
            <Row>
                <For each={configs}>
                    {(item) => {
                        const model = StoreToAtom([obj, setObj], item.value)
                        return <FormCore span={item.span ?? 6} config={item} v-model={model}></FormCore>
                    }}
                </For>
                <Col>
                    <JSONViewer data={obj}></JSONViewer>
                </Col>
            </Row>
        )
    },
    args: {}
}
