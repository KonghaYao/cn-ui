import {
    type Atom,
    type DateCalendarConfig,
    type JSXSlot,
    OriginComponent,
    OriginDiv,
    atom,
    computed,
    createCtx,
    initDayjs,
    useCalendarSelect,
    useDateCalendar,
} from "@cn-ui/reactive";
import dayjs, { type Dayjs } from "dayjs";
import { Match, Switch, createMemo, untrack } from "solid-js";
import { CalendarHeader } from "./components/CalendarHeader";
import { DateCalendarPanel } from "./components/DateCalendarPanel";
import { MonthCalenderPanel } from "./components/MonthCalenderPanel";
import { YearCalenderPanel } from "./components/YearCalenderPanel";
initDayjs();
export interface CalendarProps extends DateCalendarConfig {
    Cell?: JSXSlot<{
        date: Dayjs;
        model: Atom<Dayjs[]>;
    }>;
    /**
     * 日历选择模式
     * @tested
     */
    mode?: "single" | "multiple" | "range";
    /**
     * 日历视图
     * @tested
     */
    view?: "year" | "month" | "day";
    locales?: Intl.LocalesArgument;
}

export const CalenderCtx = createCtx<
    {
        calendarShowingType: Atom<NonNullable<CalendarProps["view"]>>;
    } & ReturnType<typeof useCalendarSelect> &
        ReturnType<typeof useDateCalendar>
>();

export const Calendar = OriginComponent<CalendarProps, HTMLDivElement, Dayjs[]>((props) => {
    const selected = props.model;
    /** 目标选择的时候使用的 */
    const calendarType = createMemo(() => props.view ?? "day");
    /** 展示的时候使用 */
    const calendarShowingType = computed(() => untrack(calendarType) ?? "day");
    const select = useCalendarSelect(selected, {
        mode: () => props.mode ?? "single",
        unit: calendarType,
    });
    const watchingDate = atom(props.model()[0] ?? dayjs());
    const calendarSystem = useDateCalendar(watchingDate, () => props);
    return (
        <CalenderCtx.Provider value={{ ...select, ...calendarSystem, calendarShowingType }}>
            <OriginDiv prop={props} class="flex flex-col select-none  min-w-[15rem]" role="grid">
                <CalendarHeader />
                <Switch>
                    <Match when={calendarShowingType() === "year"}>
                        <YearCalenderPanel />
                    </Match>
                    <Match when={calendarShowingType() === "month"}>
                        <MonthCalenderPanel />
                    </Match>
                    <Match when={calendarShowingType() === "day"}>
                        <DateCalendarPanel Cell={props.Cell} />
                    </Match>
                </Switch>
            </OriginDiv>
        </CalenderCtx.Provider>
    );
});
