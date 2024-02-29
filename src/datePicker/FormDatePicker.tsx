import { OriginComponent, ensureArrayReturn } from '@cn-ui/reactive'

import { DatePicker } from './index'

export const FormDatePicker = OriginComponent<{}, HTMLDivElement, Date | null>((props) => {
    const model = props.model.reflux(ensureArrayReturn(props.model() ?? []), (i) => i[0] ?? null)

    return <DatePicker v-model={model}></DatePicker>
})
export const FormDateRangePicker = OriginComponent<{}, HTMLDivElement, Date[] | null>((props) => {
    const model = props.model.reflux(props.model() ?? [], (i) => i)

    return <DatePicker v-model={model}></DatePicker>
})
