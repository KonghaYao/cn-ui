import { OriginComponent, classNames } from '@cn-ui/reactive'
import { DatePicker as DatePicker, useDatePickerContext } from '@ark-ui/solid'
import { Flex } from '../container'
import { Icon } from '../icon/Icon'
import './datePicker.css'
import { AiOutlineLeft, AiOutlineRight } from 'solid-icons/ai'

export const DatePanel = OriginComponent<{}, HTMLDivElement, Date[]>((props) => {
    return (
        <DatePicker.Root
            locale="zh-CN"
            open={true}
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
function DayPanel() {
    const api = useDatePickerContext()
    return (
        <DatePicker.View view="day">
            <ControlHeader></ControlHeader>
            <DatePicker.Table class="w-full cn-date-panel">
                <DatePicker.TableHead>
                    <DatePicker.TableRow>
                        {api().weekDays.map((weekDay) => (
                            <DatePicker.TableHeader class=" py-1">{weekDay.narrow}</DatePicker.TableHeader>
                        ))}
                    </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                    {api().weeks.map((week) => (
                        <DatePicker.TableRow>
                            {week.map((day) => {
                                return (
                                    <DatePicker.TableCell class="transition-colors text-center py-1 hover:bg-design-hover rounded" value={day}>
                                        <DatePicker.TableCellTrigger class={classNames('w-full')}>{day.day}</DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                )
                            })}
                        </DatePicker.TableRow>
                    ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    )
}
/** 头部的控制栏 */
function ControlHeader() {
    return (
        <Flex class="font-bold pb-1 mb-2 border-b border-design-border">
            <DatePicker.PrevTrigger>
                <Icon>
                    <AiOutlineLeft></AiOutlineLeft>
                </Icon>
            </DatePicker.PrevTrigger>
            <DatePicker.ViewTrigger class="flex-1">
                <DatePicker.RangeText />
            </DatePicker.ViewTrigger>
            <DatePicker.NextTrigger>
                <Icon>
                    <AiOutlineRight></AiOutlineRight>
                </Icon>
            </DatePicker.NextTrigger>
        </Flex>
    )
}

function MonthPanel() {
    const api = useDatePickerContext()
    return (
        <DatePicker.View view="month">
            <ControlHeader></ControlHeader>
            <DatePicker.Table class="w-full cn-date-panel">
                <DatePicker.TableBody>
                    {api()
                        .getMonthsGrid({ columns: 4, format: 'short' })
                        .map((months) => (
                            <DatePicker.TableRow>
                                {months.map((month) => (
                                    <DatePicker.TableCell class="transition-colors text-center py-2 hover:bg-design-hover rounded" value={month.value}>
                                        <DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                ))}
                            </DatePicker.TableRow>
                        ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    )
}

function YearPanel() {
    const api = useDatePickerContext()
    return (
        <DatePicker.View view="year">
            <ControlHeader></ControlHeader>
            <DatePicker.Table class="w-full cn-date-panel">
                <DatePicker.TableBody>
                    {api()
                        .getYearsGrid({ columns: 4 })
                        .map((years) => (
                            <DatePicker.TableRow>
                                {years.map((year) => (
                                    <DatePicker.TableCell class="transition-colors text-center py-2 hover:bg-design-hover rounded" value={year.value}>
                                        <DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                ))}
                            </DatePicker.TableRow>
                        ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    )
}
