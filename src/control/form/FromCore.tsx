import { Atom, toCSSPx, createBlackBoard, classNames } from '@cn-ui/reactive'
import { Dynamic, Show } from 'solid-js/web'
import { Col } from '../../RowAndCol'
import './form-core.css'
export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export const FormCore = (props: { wrap?: boolean; config: any; span?: number; errorMessage?: string; 'v-model': Atom<any>; label?: boolean }) => {
    const id = 'form-' + props.config.value
    return (
        <Col span={props.span ?? 12} class={classNames(props.wrap && 'flex-wrap', 'cn-form-core flex  gap-4')}>
            <Show when={props.label}>
                <label for={id} class="flex-none text-right w-full" style={{ 'max-width': '100px' }}>
                    <Show when={true}>
                        <sup class="text-red-400 pr-1">*</sup>
                    </Show>
                    {props.config.label ?? props.config.value}
                </label>
            </Show>
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
