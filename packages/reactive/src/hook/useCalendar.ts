import dayjs, { type Dayjs } from "dayjs/esm/index";
import isBetween from "dayjs/esm/plugin/isBetween";
import minMax from "dayjs/esm/plugin/minMax";
import { type Accessor, createMemo } from "solid-js";
import { type Atom, atom } from "../atom";
import { genArray } from "../utils";
export { dayjs, type Dayjs };
/** 手动初始化 dayjs */
let init: boolean;
export const initDayjs = () => {
    if (init) return;
    dayjs.extend(minMax);
    dayjs.extend(isBetween);
    init = true;
};

export const useCalendarSelect = (
    model: Atom<Dayjs[]>,
    config: {
        /**
         * The selection mode of the calendar.
         * - `single` - only one date can be selected
         * - `multiple` - multiple dates can be selected
         * - `range` - a range of dates can be selected
         */
        mode: Accessor<"single" | "multiple" | "range">;
        unit: Accessor<"day" | "month" | "year">;
    },
) => {
    const selectedDate = model;
    const mode = createMemo(() => config.mode());
    const unit = createMemo(() => config.unit());
    const virtualEndTime = atom(dayjs());
    const isSelectingEnd = () => {
        return selectedDate().length === 1;
    };
    const isSelected = (d: Dayjs, u?: "day" | "month" | "year") => {
        if (selectedDate().length === 0) return false;
        if (["single", "multiple"].includes(mode())) {
            return selectedDate().some((i) => d.isSame(i, u ?? unit()));
        } else if (isSelectingEnd()) {
            return isBetweenRange(d, u);
        } else {
            return d.isBetween(selectedDate()[0], selectedDate()[1], u ?? unit(), "[]");
        }
    };
    const isBetweenRange = (d: Dayjs, u?: "day" | "month" | "year") => {
        const minmax = [selectedDate()[0], virtualEndTime()];
        return d.isBetween(dayjs.min(minmax), dayjs.max(minmax), u ?? unit());
    };
    return {
        selectedDate,
        mode,
        calendarUnit: unit,
        isSelected,
        isStartDate(d: Dayjs, u?: "day" | "month" | "year") {
            if (mode() !== "range") return false;
            if (selectedDate().length === 0) return false;
            return d.isSame(selectedDate()[0], u ?? unit());
        },
        isEndDate(d: Dayjs, u?: "day" | "month" | "year") {
            if (mode() !== "range") return false;
            if (isSelectingEnd()) return d.isSame(virtualEndTime(), u ?? unit());
            if (d.isSame(selectedDate()[1], u ?? unit())) return true;
            return false;
        },
        isSelectingEnd,
        virtualEndTime,
        toggleSelect(d: Dayjs, state = !isSelected(d)) {
            switch (mode()) {
                case "single":
                    return state ? selectedDate([d]) : selectedDate([]);
                case "multiple":
                    return state
                        ? selectedDate((i) => [...i, d])
                        : selectedDate((i) => i.filter((selected) => !d.isSame(selected, unit())));
                case "range":
                    return state
                        ? selectedDate((i) => {
                              if (i.length === 0) {
                                  return [d];
                              } else if (i.length === 2) {
                                  virtualEndTime(d);
                                  return [d];
                              }

                              const max = dayjs.max(...i, d)!;
                              const min = dayjs.min(...i, d)!;
                              if (max.isSame(min, unit())) return [min];
                              return [min, max];
                          })
                        : selectedDate((i) => {
                              if (i.length === 2) {
                                  return [d];
                              }
                              return i.filter((selected) => !d.isSame(selected, unit()));
                          });
            }
        },
    };
};

export interface DateCalendarConfig {
    /** 日历中一周的第一天是星期几 */
    startOfWeek?: number;
    extraStartWeek?: number;
    extraEndWeek?: number;
    locales?: Intl.LocalesArgument;
}

/** 经典日期日历 */
export const useDateCalendar = (targetDate: Atom<Dayjs>, config: Accessor<DateCalendarConfig>) => {
    const allDateInMonth = createMemo(() => {
        const firstDateOfMonth = targetDate().startOf("month");
        const lastDateOfMonth = targetDate().endOf("month");

        const firstDateOfCalendar = firstDateOfMonth.day(config().startOfWeek ?? 0);
        const lastDateOfCalendar = lastDateOfMonth.add(
            7 - (lastDateOfMonth.day() - (config().startOfWeek ?? 0) + 1),
            "d",
        );
        return {
            firstDateOfCalendar,
            lastDateOfCalendar,
            firstDateOfMonth,
            lastDateOfMonth,
            dayInMonth: getDaysInRange(firstDateOfMonth, lastDateOfMonth),
            paddingStart: getDaysInRange(firstDateOfCalendar, firstDateOfMonth.add(-1, "d")),
            paddingEnd: getDaysInRange(lastDateOfMonth.add(1, "d"), lastDateOfCalendar),
        };
    });
    const extraStartWeek = createMemo(() => {
        const num = config().extraStartWeek;
        if (num && num >= 0) {
            const start = allDateInMonth().firstDateOfCalendar;
            return getDaysInRange(start.add(-num!, "w"), start.add(-1, "d"));
        } else {
            return [];
        }
    });
    const extraEndWeek = createMemo(() => {
        const num = config().extraEndWeek;
        if (num && num >= 0) {
            const end = allDateInMonth().lastDateOfCalendar;
            return getDaysInRange(end.add(1, "d"), end.add(num!, "w"));
        } else {
            return [];
        }
    });
    return {
        targetDate,
        allDateInMonth,
        extraStartWeek,
        extraEndWeek,
        monthHeader() {
            const locales = config().locales;
            // @ts-ignore locale type 判断失效
            return MonthLocale(locales, { month: "short", locale: locales });
        },
        weekHeader() {
            const locales = config().locales;
            const names = WeekTitleLocale(locales, { weekday: "narrow" });
            return genArray(7)
                .map((i) => ((config().startOfWeek ?? 0) + i) % 7)
                .map((i) => names[i]);
        },
        isInMonth(date: Dayjs) {
            return date.isSame(targetDate(), "month");
        },
    };
};

export const WeekTitleLocale = (
    locales?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
) => {
    const weekdays = genArray(7);
    const today = dayjs();
    const formatter = new Intl.DateTimeFormat(locales, options);

    return weekdays.map((index) => {
        const date = today.day(index);
        return formatter.format(date.toDate());
    });
};
export const MonthLocale = (
    locales?: Intl.LocalesArgument,
    options?: Intl.DateTimeFormatOptions,
) => {
    const formatter = new Intl.DateTimeFormat(locales, options);
    return genArray(12).map((i) => {
        const date = new Date(Date.UTC(2000, i, 1));
        return formatter.format(date);
    });
};

/** 获取日期区间中所有天，这个包含左右两端 */
export const getDaysInRange = (startDate: Dayjs, endDate: Dayjs) => {
    if (endDate < startDate) {
        console.warn("getDaysInRange end > start");
        return [];
    }
    const days = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
        days.push(currentDate);
        currentDate = currentDate.add(1, "day");
    }
    return days;
};
