import { OriginComponent } from '@cn-ui/reactive'
import { BaseInput, BaseInputProps } from './index'

export const FormInput = OriginComponent<BaseInputProps, HTMLDivElement, string | null>((props) => {
    const model = props.model.reflux(props.model()! ?? '', (i) => i ?? null)
    return <BaseInput {...(props as any)} v-model={model}></BaseInput>
})
