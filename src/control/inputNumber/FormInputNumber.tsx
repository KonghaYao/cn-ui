import { OriginComponent } from '@cn-ui/reactive'

import { InputNumber, InputNumberProps } from './InputNumber'

export const FormInputNumber = OriginComponent<InputNumberProps, HTMLDivElement, number | null>((props) => {
    const model = props.model.reflux(props.model() ?? 0, (i) => i)
    return <InputNumber {...(props as any)} v-model={model} controls></InputNumber>
})
