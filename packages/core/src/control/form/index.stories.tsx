import type { Meta, StoryObj } from 'storybook-solidjs'

import { NullAtom, ObjectAtom, StoreToAtom, atom } from '@cn-ui/reactive'
import { FormCore, FormCoreRegister } from './FormCore'
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
import { ColumnDef } from '@tanstack/solid-table'
import { MagicForm } from './MagicForm'

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
const mustFill = {
    required: true,
    message: '此项必填'
}
const configs = [
    { header: 'info', accessorKey: 'info', type: 'text', required: true },
    { header: 'number', accessorKey: 'number', type: 'number' },
    { header: 'date', accessorKey: 'date', type: 'date', rules: [mustFill] },
    { header: 'date-range', accessorKey: 'date-range', type: 'date-range' },
    {
        header: 'select',
        accessorKey: 'select',
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
        header: 'checkbox',
        accessorKey: 'checkbox',
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
        header: 'radio',
        accessorKey: 'radio',
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
        rules: [mustFill],
        span: 24
    }
] satisfies ColumnDef<unknown, unknown>[]

export const Primary: Story = {
    name: 'FormCore 表单核心',
    render() {
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
        const disabled = atom(false)
        return (
            <form ref={form}>
                <Row>
                    <For each={configs}>
                        {(item) => {
                            const model = StoreToAtom([obj, setObj], (item as any).accessorKey)
                            return <FormCore disabled={disabled()} showLabel config={item} v-model={model}></FormCore>
                        }}
                    </For>
                    <Col span={24}>
                        <div
                            onclick={() => {
                                disabled((i) => !i)
                            }}
                        >
                            Disable Trigger
                        </div>
                    </Col>
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
export const _MagicForm: Story = {
    name: 'MagicForm 集成表单',
    render() {
        const [obj, setObj] = createStore({
            select: 'tom'
        })
        return (
            <Row>
                <MagicForm config={configs} originData={obj} setOriginData={setObj}></MagicForm>
                <Col span={24}>
                    <JSONViewer data={obj}></JSONViewer>
                </Col>
            </Row>
        )
    },
    args: {}
}
export const _Error: Story = {
    name: 'ErrorState 错误状态',
    render() {
        const [obj, setObj] = createStore({})
        return (
            <Row>
                <MagicForm config={configs.map((i) => ((i.required = true), i))} originData={obj} setOriginData={setObj}></MagicForm>
                <Col span={24}>
                    <JSONViewer data={obj}></JSONViewer>
                </Col>
            </Row>
        )
    },
    args: {}
}
