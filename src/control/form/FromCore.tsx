import { Atom, toCSSPx, createBlackBoard } from '@cn-ui/reactive'
import { Dynamic, Show } from 'solid-js/web'
import { Col } from '../../RowAndCol'

export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export const FormCore = (props: { config: any; span?: number; errorMessage?: string; 'v-model': Atom<any> }) => {
    const id = 'form-' + props.config.value
    return (
        <Col span={props.span ?? 6} class="cn-form-core flex flex-wrap gap-4">
            <label for={id} class="flex-none text-right" style={{ 'max-width': '25%' }}>
                <Show when={true}>
                    <sup class="text-red-400 pr-1">*</sup>
                </Show>
                {props.config.label ?? props.config.value}
            </label>
            <Dynamic
                id={id}
                component={FormCoreRegister.getApp(props.config.type)}
                {...props.config}
                name={props.config.value}
                v-model={props['v-model']}
            ></Dynamic>
            <Show when={props.errorMessage}>
                <div class="cn-error-message">{props.errorMessage}</div>
            </Show>
        </Col>
    )
}
