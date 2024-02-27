import { OriginComponent } from '@cn-ui/reactive'
import { DatePicker as DatePicker } from '@ark-ui/solid'
import './datePicker.css'
import { DayPanel } from '../components/DayPanel'
import { MonthPanel } from '../components/MonthPanel'
import { YearPanel } from '../components/YearPanel'

export const tableCellClasss = "transition-colors duration-300 text-center hover:bg-design-hover rounded"

export const DatePanel = OriginComponent<{}, HTMLDivElement, Date[]>((props) => {
    return (
        <DatePicker.Root
            locale="zh-CN"
            open={true}
            class='min-w-72'
            selectionMode="range"
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
            <DayPanel></DayPanel>
            <MonthPanel></MonthPanel>
            <YearPanel></YearPanel>
        </DatePicker.Root>
    )
})


