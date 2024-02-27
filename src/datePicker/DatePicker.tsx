import { Popover } from "../popover";
import { NullAtom, OriginComponent, atom, computed } from "@cn-ui/reactive";
import { BaseInput, ClearControl } from "../control/input";
import { DatePanel, DatePanelProps } from "./Panel/DatePanel";
import { Match, Switch, createMemo } from "solid-js";
import { DatePickerContext } from "@ark-ui/solid";

export interface DatePickerProps extends DatePanelProps {
    formatter?: (date: Date, locale?: string) => string
}

const DefaultDateFomatter = (date: Date, locale?: string) => {
    return new Intl.DateTimeFormat(locale ?? 'zh-CN').format(date)
}
export const DatePicker = OriginComponent<DatePickerProps, HTMLDivElement, Date[]>((props) => {

    const stringDate = computed(() => {
        return props.model().map(i => (props.formatter ?? DefaultDateFomatter)(i, props.locale))
    })
    const DatePickerExpose = NullAtom<ReturnType<DatePickerContext>>(null)
    return <Popover wrapperClass="p-2" content={() => <DatePanel  {...props as DatePanelProps} expose={(api) => {
        props.expose?.(api)
        DatePickerExpose(api)
    }} v-model={props.model}></DatePanel>}>
        <Switch fallback={<BaseInput v-model={createMemo(() => stringDate()[0] ?? '')} suffixIcon={() => <ClearControl onClear={() => {
            DatePickerExpose()?.clearValue()
        }}></ClearControl>}></BaseInput>}>

            <Match when={props.mode === 'multiple'}>
                <BaseInput v-model={createMemo(() => stringDate()[0] ?? "")}></BaseInput>
            </Match>
            <Match when={props.mode === 'range'}>
                <BaseInput v-model={createMemo(() => stringDate()[0] ?? '')}></BaseInput>
                <BaseInput v-model={createMemo(() => stringDate()[1] ?? '')}></BaseInput>
            </Match>
        </Switch>
    </Popover>
})