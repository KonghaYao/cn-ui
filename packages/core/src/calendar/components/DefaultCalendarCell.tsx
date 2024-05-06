import { firstClass } from "@cn-ui/reactive";
import type { Dayjs } from "dayjs";
import { CalenderCtx } from "../Calendar";

export const CalendarDateCell = (props: { date: Dayjs }) => {
    const calendarSystem = CalenderCtx.use();
    const edgeDateClass = "bg-primary-50 text-primary-500 hover:text-primary-600 cn-selected";
    return (
        <td
            aria-label={props.date.format("YYYY MM DD")}
            class={firstClass.base(
                "transition-colors cursor-pointer  w-8 h-8 flex justify-center items-center rounded-md",
            )(
                (calendarSystem.isStartDate(props.date) ||
                    calendarSystem.isEndDate(props.date) ||
                    calendarSystem.isSelected(props.date)) &&
                    edgeDateClass,
                "hover:bg-gray-100",
            )}
        >
            <div
                role="gridcell"
                aria-selected={calendarSystem.isSelected(props.date) || undefined}
                class={firstClass.base("")(
                    (calendarSystem.isEndDate(props.date) ||
                        calendarSystem.isStartDate(props.date)) &&
                        " w-6 h-6 rounded-full  bg-primary-600 text-white",
                )}
            >
                {props.date.date()}
            </div>
        </td>
    );
};
export const CalendarMonthCell = (props: { date: Dayjs }) => {
    const calendarSystem = CalenderCtx.use();
    const edgeDateClass = "bg-primary-50 text-primary-300 hover:text-primary-600";
    return (
        <div
            aria-label={props.date.format("YYYY MM")}
            role="gridcell"
            aria-selected={calendarSystem.isSelected(props.date, "month")}
            class={firstClass.base(
                "transition-colors cursor-pointer p-2 h-6 flex justify-center items-center w-full rounded-md",
            )(
                (calendarSystem.isStartDate(props.date, "month") ||
                    calendarSystem.isEndDate(props.date, "month")) &&
                    "bg-primary-50 text-primary-600 hover:text-primary-800",
                calendarSystem.isSelected(props.date, "month") && edgeDateClass,
                "hover:bg-gray-100",
            )}
        >
            {calendarSystem.monthHeader()[props.date.month()]}
        </div>
    );
};
export const CalendarYearCell = (props: { date: Dayjs; year: number }) => {
    const calendarSystem = CalenderCtx.use();
    const edgeDateClass = "bg-primary-50 text-primary-300 hover:text-primary-600";
    return (
        <div
            aria-label={props.date.format("YYYY")}
            role="gridcell"
            aria-selected={calendarSystem.isSelected(props.date, "year")}
            class={firstClass.base(
                "transition-colors cursor-pointer p-2 h-6 flex justify-center items-center w-full rounded-md",
            )(
                (calendarSystem.isStartDate(props.date, "year") ||
                    calendarSystem.isEndDate(props.date, "year")) &&
                    "bg-primary-50 text-primary-600 hover:text-primary-800",
                calendarSystem.isSelected(props.date, "year") && edgeDateClass,
                "hover:bg-gray-100",
            )}
        >
            {props.year}
        </div>
    );
};
