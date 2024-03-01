import { OriginComponent, ensureArrayReturn } from '@cn-ui/reactive'

import { DatePicker, DatePickerProps } from './index'

export const FormDatePicker = OriginComponent<DatePickerProps, HTMLDivElement, Date | null>((props) => {
    const model = props.model.reflux(ensureArrayReturn(props.model() ?? []), (i) => i[0] ?? null)

    return <DatePicker {...(props as any)} v-model={model}></DatePicker>
})
export const FormDateRangePicker = OriginComponent<DatePickerProps, HTMLDivElement, Date[] | null>((props) => {
    const model = props.model.reflux(props.model() ?? [], (i) => i)

    return <DatePicker {...(props as any)} mode="range" v-model={model}></DatePicker>
})
