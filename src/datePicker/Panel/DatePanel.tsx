import { OriginComponent } from '@cn-ui/reactive'
import { DatePicker as DatePicker, DatePickerContext, useDatePickerContext } from '@ark-ui/solid'
import './datePanel.css'
import { DayPanel } from '../components/DayPanel'
import { MonthPanel } from '../components/MonthPanel'
import { YearPanel } from '../components/YearPanel'
import { onMount } from 'solid-js'

export const tableCellClasss = 'transition-colors duration-300 text-center hover:bg-design-hover rounded'

export interface DatePanelProps {
    locale?: string
    /**
     * The selection mode of the calendar.
     * - `single` - only one date can be selected
     * - `multiple` - multiple dates can be selected
     * - `range` - a range of dates can be selected
     */
    mode?: 'single' | 'multiple' | 'range'
    expose?: (api: ReturnType<DatePickerContext>) => void
}

export const DateToDatePanelString = (date: Date) => {
    return `${date.getFullYear}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}
export const DatePanel = OriginComponent<DatePanelProps, HTMLDivElement, Date[]>((props) => {
    return (
        <DatePicker.Root
            locale={props.locale ?? 'zh-CN'}
            open={true}
            /** @ts-ignore */
            value={props.model()}
            class="min-w-72"
            selectionMode={props.mode ?? 'single'}
            closeOnSelect={false}
            onValueChange={(val) => {
                props.model(() =>
                    val.value.map((i) =>
                        /** @ts-ignore 无时获取默认时区 */
                        i.toDate()
                    )
                )
            }}
        >
            {Expose(props)}
            <DayPanel></DayPanel>
            <MonthPanel></MonthPanel>
            <YearPanel></YearPanel>
        </DatePicker.Root>
    )
})

const Expose = (props: DatePanelProps) => {
    const api = useDatePickerContext()
    onMount(() => {
        props.expose?.(api())
    })
    return null
}
