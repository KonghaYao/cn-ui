import { OriginComponent } from '@cn-ui/reactive'
import { DatePicker as DatePicker } from '@ark-ui/solid'
import { Button } from '../button'
import { Icon } from '../icon/Icon'
import { Portal } from 'solid-js/web'

export const DatePanel = OriginComponent(() => {

    return (
        <DatePicker.Root open={true} closeOnSelect={false}>
            {(api) => (
                <>
                    <DatePicker.View view="day">
                        <DatePicker.ViewControl>
                            <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                            <DatePicker.ViewTrigger>
                                <DatePicker.RangeText />
                            </DatePicker.ViewTrigger>
                            <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                        </DatePicker.ViewControl>
                        <DatePicker.Table>
                            <DatePicker.TableHead>
                                <DatePicker.TableRow>
                                    {api().weekDays.map((weekDay) => (
                                        <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                                    ))}
                                </DatePicker.TableRow>
                            </DatePicker.TableHead>
                            <DatePicker.TableBody>
                                {api().weeks.map((week) => (
                                    <DatePicker.TableRow>
                                        {week.map((day) => (
                                            <DatePicker.TableCell value={day}>
                                                <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                                            </DatePicker.TableCell>
                                        ))}
                                    </DatePicker.TableRow>
                                ))}
                            </DatePicker.TableBody>
                        </DatePicker.Table>
                    </DatePicker.View>
                </>
            )}
        </DatePicker.Root>
    )

})