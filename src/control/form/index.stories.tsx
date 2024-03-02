import type { Meta, StoryObj } from 'storybook-solidjs'

import { NullAtom, ObjectAtom, StoreToAtom, atom } from '@cn-ui/reactive'
import { FormCore, FormCoreRegister } from './FromCore'
import { For, createEffect, createMemo, onCleanup } from 'solid-js'
import { FormInput } from '../input/FormInput'
import { FormSelect } from '../select/FormSelect'
import { Col, Row } from '../../RowAndCol'
import { createStore } from 'solid-js/store'
import { JSONViewer } from '../../dataViewer'
import { FormRadio } from '../checkbox/FormRadio'
import { FormCheckBox } from '../checkbox/FormCheckBox'
import { FormInputNumber } from '../inputNumber/FormInputNumber'
import { FormDatePicker, FormDateRangePicker } from '../../datePicker/FormDatePicker'
import { useInterval, watch } from 'solidjs-use'

const meta = {
    title: 'From/FormCore',
    component: FormCore,
    argTypes: {}
} satisfies Meta<typeof FormCore>

export default meta
type Story = StoryObj<typeof meta>

FormCoreRegister.register('text', FormInput, { allowSameRegister: true })
FormCoreRegister.register('select', FormSelect, { allowSameRegister: true })
FormCoreRegister.register('number', FormInputNumber, { allowSameRegister: true })
FormCoreRegister.register('date', FormDatePicker, { allowSameRegister: true })
FormCoreRegister.register('date-range', FormDateRangePicker, { allowSameRegister: true })
FormCoreRegister.register('radio', FormRadio, { allowSameRegister: true })
FormCoreRegister.register('checkbox', FormCheckBox, { allowSameRegister: true })

export const Primary: Story = {
    name: 'Checkbox 多选框',
    render() {
        const configs = [
            { label: 'info', value: 'info', type: 'text' },
            { label: 'number', value: 'number', type: 'number' },
            { label: 'date', value: 'date', type: 'date' },
            { label: 'date-range', value: 'date-range', type: 'date-range' },
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
        const form = NullAtom<HTMLFormElement>(null)
        const formData = atom({})
        const getFormData = () => {
            if (!form()) formData({})
            formData(Object.fromEntries(new FormData(form()!).entries()))
        }
        const time = setInterval(() => {
            getFormData()
        }, 1000)
        onCleanup(() => clearInterval(time))
        return (
            <form ref={form}>
                <Row>
                    <For each={configs}>
                        {(item) => {
                            const model = StoreToAtom([obj, setObj], item.value)
                            return <FormCore label span={item.span} config={item} v-model={model}></FormCore>
                        }}
                    </For>
                    <Col span={12}>
                        <JSONViewer data={obj}></JSONViewer>
                    </Col>
                    <Col span={12}>
                        <JSONViewer data={formData()}></JSONViewer>
                    </Col>
                </Row>
            </form>
        )
    },
    args: {}
}
