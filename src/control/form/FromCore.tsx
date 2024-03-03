import { Atom, createBlackBoard, classNames, ensureArrayReturn } from '@cn-ui/reactive'
import { Dynamic, Show } from 'solid-js/web'
import { Col } from '../../RowAndCol'
import './form-core.css'
import { RootColumnDef } from './utils'
import { createMemo } from 'solid-js'
import { getKeyFromRootColumnDef } from './utils'
import { flexRender } from '@tanstack/solid-table'
import { MagicFormCtx } from './MagicForm'
export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export interface FormCoreProps<T, D> {
    'v-model': Atom<any>
    originData?: T
    index?: number
    config: RootColumnDef<T, D>
    disabled?: boolean
    wrap?: boolean
    span?: number
    showLabel?: boolean
    errorMessage?: string
}
export function FormCore<T, D>(props: FormCoreProps<T, D>) {
    const accessorKey = createMemo(() => getKeyFromRootColumnDef(props.config, props.originData as T, props.index ?? 0))
    const id = createMemo(() => 'form-' + accessorKey())
    const isRequired = createMemo(() => props.config.required || ensureArrayReturn(props.config.rules).some((i) => i?.required))
    const { validResult } = MagicFormCtx.use() || {}
    const errorMessage = createMemo(() => {
        if (props.errorMessage) return [props.errorMessage]
        return validResult?.()?.fields[accessorKey()]?.map((i) => i.message as string)
    })
    return (
        <Col span={props.span ?? props.config.span ?? 12} class={classNames('cn-form-core relative flex', props.wrap ? 'flex-wrap flex-col gap-2' : 'gap-4')}>
            <Show when={props.showLabel}>
                <label for={id()} class={classNames('flex-none w-full', props.wrap ? 'text-left' : 'text-right')} style={{ 'max-width': '100px' }}>
                    <Show when={isRequired()}>
                        <sup class="text-red-400 pr-1">*</sup>
                    </Show>
                    {flexRender(props.config.header ?? accessorKey(), {})}
                </label>
            </Show>
            <div class="flex flex-col flex-1">
                <Dynamic
                    id={id()}
                    component={FormCoreRegister.getApp(props.config.type as string)}
                    {...props.config}
                    disabled={props.disabled}
                    name={accessorKey()}
                    v-model={props['v-model']}
                ></Dynamic>

                <Show when={errorMessage()}>
                    <div
                        class="cn-error-message text-xs text-red-400 absolute "
                        style={{
                            top: '90%'
                        }}
                    >
                        {errorMessage()?.join('; ')}
                    </div>
                </Show>
            </div>
        </Col>
    )
}
