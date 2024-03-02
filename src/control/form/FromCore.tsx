import { Atom, createBlackBoard, classNames } from '@cn-ui/reactive'
import { Dynamic, Show } from 'solid-js/web'
import { Col } from '../../RowAndCol'
import './form-core.css'
export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export interface FormCoreProps {
    'v-model': Atom<any>
    config: any

    disabled?: boolean
    wrap?: boolean
    span?: number
    label?: boolean
    errorMessage?: string
}

export const FormCore = (props: FormCoreProps) => {
    const id = 'form-' + props.config.accessorKey
    return (
        <Col span={props.span ?? 12} class={classNames(props.wrap && 'flex-wrap', 'cn-form-core flex  gap-4')}>
            <Show when={props.label}>
                <label for={id} class="flex-none text-right w-full" style={{ 'max-width': '100px' }}>
                    <Show when={true}>
                        <sup class="text-red-400 pr-1">*</sup>
                    </Show>
                    {props.config.header ?? props.config.accessorKey}
                </label>
            </Show>
            <Dynamic
                id={id}
                component={FormCoreRegister.getApp(props.config.type)}
                {...props.config}
                disabled={props.disabled}
                name={props.config.accessorKey}
                v-model={props['v-model']}
            ></Dynamic>
            <Show when={props.errorMessage}>
                <div class="cn-error-message">{props.errorMessage}</div>
            </Show>
        </Col>
    )
}
