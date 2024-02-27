import { DatePicker as DatePicker, useDatePickerContext } from '@ark-ui/solid';
import { ControlHeader } from './ControlHeader';
import { tableCellClasss } from '../Panel/DatePanel';

export function MonthPanel() {
    const api = useDatePickerContext();
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
                                    <DatePicker.TableCell class='py-1 px-0' value={month.value}>
                                        <DatePicker.TableCellTrigger class={'w-full ' + tableCellClasss}>{month.label}</DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                ))}
                            </DatePicker.TableRow>
                        ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    );
}
