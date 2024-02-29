import { OriginComponent } from '@cn-ui/reactive'

import { InputNumber } from './InputNumber'

export const FormInputNumber = OriginComponent<{}, HTMLDivElement, number | null>((props) => {
    const model = props.model.reflux(props.model() ?? 0, (i) => i)
    return <InputNumber v-model={model} controls></InputNumber>
})
