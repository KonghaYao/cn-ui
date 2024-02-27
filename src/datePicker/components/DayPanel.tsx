import { classNames } from '@cn-ui/reactive';
import { DatePicker as DatePicker, useDatePickerContext } from '@ark-ui/solid';
import { tableCellClasss } from '../Panel/DatePanel';
import { ControlHeader } from './ControlHeader';

export function DayPanel() {
    const api = useDatePickerContext();
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
                                    <DatePicker.TableCell class='py-1 px-0' value={day}>
                                        <DatePicker.TableCellTrigger class={classNames('w-full p-1', tableCellClasss, api().value.some(i => i.toString() === day.toString()) && "cn-day-edge")}>
                                            {day.day}
                                        </DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                );
                            })}
                        </DatePicker.TableRow>
                    ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    );
}
