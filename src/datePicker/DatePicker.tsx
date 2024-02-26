import { OriginComponent } from '@cn-ui/reactive'
import { DatePicker as DatePicker } from '@ark-ui/solid'
import { Flex } from '../container'

export const DatePanel = OriginComponent(() => {

    return (
        <DatePicker.Root
            locale='zh-CN'
            open={true}
            closeOnSelect={false}>
            {(api) => {
                return <DatePicker.View view="day">
                    <Flex>
                        <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                        <DatePicker.ViewTrigger class='flex-1'>
                            <DatePicker.RangeText />
                        </DatePicker.ViewTrigger>
                        <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
                    </Flex>
                    <DatePicker.Table>
                        <DatePicker.TableHead>
                            <DatePicker.TableRow>
                                {api().weekDays.map((weekDay) => (
                                    <DatePicker.TableHeader>{weekDay.narrow}</DatePicker.TableHeader>
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
            }
            }
        </DatePicker.Root>
    )

})