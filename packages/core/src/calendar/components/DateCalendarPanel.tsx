import { classNames, ensureFunctionResult, firstClass } from "@cn-ui/reactive";
import type { Dayjs } from "@cn-ui/reactive";
import { debounce } from "radash";
import { For, createMemo } from "solid-js";
import { type CalendarProps, CalenderCtx } from "../Calendar";
import { CalendarDateCell } from "./DefaultCalendarCell";
/**
 * Sorts an array of items into groups. The return value is a map where the keys are
 * the group ids the given getGroupId function produced and the value is an array of
 * each item in that group.
 */
export const group = <T, Key extends string | number | symbol>(
    array: readonly T[],
    getGroupId: (item: T, index: number) => Key,
    originSource = {},
): Partial<Record<Key, T[]>> => {
    return array.reduce(
        (acc, item, index) => {
            const groupId = getGroupId(item, index);
            if (!acc[groupId]) acc[groupId] = [];
            acc[groupId].push(item);
            return acc;
        },
        originSource as Record<Key, T[]>,
    );
};

export const DateCalendarPanel = (props: { Cell?: CalendarProps["Cell"] }) => {
    const calendarSystem = CalenderCtx.use();

    const weeks = createMemo(() => {
        const dates = calendarSystem.allDateInMonth();
        return group(
            [
                ...calendarSystem.extraStartWeek(),
                ...dates.paddingStart,
                ...dates.dayInMonth,
                ...dates.paddingEnd,
                ...calendarSystem.extraEndWeek(),
            ],
            (_, index) => Math.floor(index / 7),
            [],
        ) as Dayjs[][];
    });
    return (
        <table class="text-center" role="grid">
            <thead class=" text-xs py-2">
                <For each={calendarSystem.weekHeader()}>
                    {(date) => {
                        return <th class={classNames("p-2")}>{date}</th>;
                    }}
                </For>
            </thead>
            <tbody class="my-1">
                <For each={weeks()}>
                    {(dates) => {
                        return (
                            <tr>
                                <For each={dates}>
                                    {(date) => {
                                        return (
                                            <td
                                                class={firstClass.base("p-0")(
                                                    !calendarSystem.isInMonth(date) && "opacity-50",
                                                    "",
                                                )}
                                                onmouseover={debounce({ delay: 100 }, () => {
                                                    if (calendarSystem.isSelectingEnd())
                                                        calendarSystem.virtualEndTime(date);
                                                })}
                                                onclick={() => {
                                                    !calendarSystem.isInMonth(date) &&
                                                        calendarSystem.targetDate((i) =>
                                                            i.set("month", date.month()),
                                                        );
                                                    calendarSystem.toggleSelect(date);
                                                }}
                                            >
                                                {ensureFunctionResult(
                                                    props.Cell ?? CalendarDateCell,
                                                    [{ date, model: calendarSystem.selectedDate }],
                                                )}
                                            </td>
                                        );
                                    }}
                                </For>
                            </tr>
                        );
                    }}
                </For>
            </tbody>
        </table>
    );
};
