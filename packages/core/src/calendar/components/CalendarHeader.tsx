import { AiOutlineDoubleLeft, AiOutlineLeft } from "solid-icons/ai";
import { Show, createMemo } from "solid-js";
import { Icon } from "../../icon";
import { CalenderCtx } from "../Calendar";

export function CalendarHeader() {
    const calendarSystem = CalenderCtx.use();
    const iconClass = "transition-colors cursor-pointer hover:text-design-text";
    const isDayView = createMemo(() => calendarSystem.calendarShowingType() === "day");
    const isYearView = createMemo(() => calendarSystem.calendarShowingType() === "year");
    return (
        <div class="flex  py-2 border-b gap-1">
            <Icon
                role="button"
                aria-hidden={false}
                aria-label="上一年"
                onclick={() =>
                    calendarSystem.targetDate((i) => i.add(isYearView() ? -12 : -1, "year"))
                }
                class={iconClass}
            >
                <AiOutlineDoubleLeft />
            </Icon>
            <Show when={isDayView()}>
                <Icon
                    role="button"
                    aria-hidden={false}
                    aria-label="上一月"
                    class={iconClass}
                    onclick={() => calendarSystem.targetDate((i) => i.add(-1, "month"))}
                >
                    <AiOutlineLeft />
                </Icon>
            </Show>
            <div class="flex-1 text-center">
                <span
                    role="button"
                    aria-label={`${calendarSystem.targetDate().year()}年 点击进入年面板`}
                    class="hover:text-primary-400 px-1 cursor-pointer"
                    onclick={() => calendarSystem.calendarShowingType("year")}
                >
                    {calendarSystem.targetDate().year()}
                </span>
                <Show when={calendarSystem.calendarShowingType() === "day"}>
                    <span
                        role="button"
                        aria-label={`${calendarSystem.targetDate().month() + 1}月 点击进入月面板`}
                        class="hover:text-primary-400 px-1 cursor-pointer"
                        onclick={() => calendarSystem.calendarShowingType("month")}
                    >
                        {calendarSystem.targetDate().month() + 1}
                    </span>
                </Show>
            </div>
            <Show when={calendarSystem.calendarShowingType() === "day"}>
                <Icon
                    role="button"
                    aria-hidden={false}
                    aria-label="下一月"
                    class={`${iconClass} rotate-180`}
                    onclick={() => calendarSystem.targetDate((i) => i.add(1, "month"))}
                >
                    <AiOutlineLeft />
                </Icon>
            </Show>
            <Icon
                role="button"
                aria-hidden={false}
                aria-label="下一年"
                onclick={() =>
                    calendarSystem.targetDate((i) => i.add(isYearView() ? 12 : 1, "year"))
                }
                class={`${iconClass} rotate-180`}
            >
                <AiOutlineDoubleLeft />
            </Icon>
        </div>
    );
}
