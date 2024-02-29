import { OriginComponent } from '@cn-ui/reactive'
import { BaseInput } from './index'

export const FormInput = OriginComponent<{}, HTMLDivElement, string | null>((props) => {
    const model = props.model.reflux(props.model()! ?? '', (i) => i ?? null)
    return <BaseInput v-model={model}></BaseInput>
})
