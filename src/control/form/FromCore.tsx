import { Atom, NullAtom, computed, createBlackBoard } from '@cn-ui/reactive'
import { Dynamic, Show } from 'solid-js/web'
import { Col } from '../../RowAndCol'

export const FormCoreRegister = createBlackBoard<Record<string, any>>()

export const FormCore = (props: { config: any; span?: number; errorMessage?: string; 'v-model': Atom<any> }) => {
    return (
        <Col span={props.span ?? 6} class="cn-form-core">
            <Dynamic component={FormCoreRegister.getApp(props.config.type)} {...props.config} v-model={props['v-model']}></Dynamic>
            <Show when={props.errorMessage}>
                <div class="cn-error-message">{props.errorMessage}</div>
            </Show>
        </Col>
    )
}
