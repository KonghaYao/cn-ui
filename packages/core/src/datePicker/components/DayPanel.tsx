import { classNames } from '@cn-ui/reactive'
import { DatePicker as DatePicker, useDatePickerContext } from '@ark-ui/solid'
import { tableCellClasss } from '../Panel/DatePanel'
import { ControlHeader } from './ControlHeader'
import { createMemo } from 'solid-js'

export function DayPanel() {
    const api = useDatePickerContext()
    return (
        <DatePicker.View view="day">
            <ControlHeader></ControlHeader>
            <DatePicker.Table class="w-full cn-date-panel">
                <DatePicker.TableHead>
                    <DatePicker.TableRow>
                        {api().weekDays.map((weekDay) => (
                            <DatePicker.TableHeader class="font-normal py-1">{weekDay.narrow}</DatePicker.TableHeader>
                        ))}
                    </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                    {api().weeks.map((week) => (
                        <DatePicker.TableRow>
                            {week.map((day) => {
                                const isEdge = createMemo(() => api().value.some((i) => i.toString() === day.toString()))
                                return (
                                    <DatePicker.TableCell class={classNames(isEdge() ? 'px-0' : 'px-0', 'w-12 h-12')} value={day}>
                                        {/* 样式压不住，所以采用类名 */}
                                        <DatePicker.TableCellTrigger class={classNames('p-1 w-full', tableCellClasss, isEdge() && 'cn-day-edge')}>
                                            {day.day}
                                        </DatePicker.TableCellTrigger>
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
