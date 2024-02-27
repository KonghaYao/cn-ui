import { DatePicker as DatePicker, useDatePickerContext } from '@ark-ui/solid';
import { ControlHeader } from './ControlHeader';
import { tableCellClasss } from '../Panel/DatePanel';

export function YearPanel() {
    const api = useDatePickerContext();
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
                                    <DatePicker.TableCell class='py-1 px-0' value={year.value}>
                                        <DatePicker.TableCellTrigger class={'w-full ' + tableCellClasss}>{year.label}</DatePicker.TableCellTrigger>
                                    </DatePicker.TableCell>
                                ))}
                            </DatePicker.TableRow>
                        ))}
                </DatePicker.TableBody>
            </DatePicker.Table>
        </DatePicker.View>
    );
}
