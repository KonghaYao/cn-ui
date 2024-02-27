import { Popover } from '../popover'
import { NullAtom, OriginComponent, OriginDiv, atom, computed } from '@cn-ui/reactive'
import { BaseInput, ClearControl } from '../control/input'
import { DatePanel, DatePanelProps } from './Panel/DatePanel'
import { Match, Show, Switch, createMemo } from 'solid-js'
import { DatePickerContext } from '@ark-ui/solid'
import { AiOutlineCalendar, AiOutlineClear, AiOutlineCloseCircle, AiOutlineSwapRight } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import '../animation/fade.css'
import { useElementHover } from 'solidjs-use'

export interface DatePickerProps extends DatePanelProps {
    formatter?: (date: Date, locale?: string) => string
}

const DefaultDateFormatter = (date: Date, locale?: string) => {
    return new Intl.DateTimeFormat(locale ?? 'zh-CN').format(date)
}
export const DatePicker = OriginComponent<DatePickerProps, HTMLDivElement, Date[]>((props) => {
    const stringDate = computed(() => {
        return props.model().map((i) => (props.formatter ?? DefaultDateFormatter)(i, props.locale))
    })
    const DatePickerExpose = NullAtom<ReturnType<DatePickerContext>>(null)
    return (
        <Popover
            wrapperClass="p-2"
            content={() => (
                <DatePanel
                    {...(props as DatePanelProps)}
                    expose={(api) => {
                        props.expose?.(api)
                        DatePickerExpose(api)
                    }}
                    v-model={props.model}
                ></DatePanel>
            )}
        >
            <Switch
                fallback={
                    <BaseInput
                        placeholder="请输入日期"
                        readonly
                        v-model={createMemo(() => stringDate()[0] ?? '')}
                        suffixIcon={({ isHovering }) => (
                            <>
                                <Show
                                    when={isHovering()}
                                    fallback={
                                        <Icon>
                                            <AiOutlineCalendar></AiOutlineCalendar>
                                        </Icon>
                                    }
                                >
                                    <ClearControl
                                        onClear={() => {
                                            DatePickerExpose()?.clearValue()
                                        }}
                                    ></ClearControl>
                                </Show>
                            </>
                        )}
                    ></BaseInput>
                }
            >
                <Match when={props.mode === 'multiple'}>
                    <BaseInput readonly v-model={createMemo(() => stringDate()[0] ?? '')}></BaseInput>
                </Match>
                <Match when={props.mode === 'range'}>
                    <RangeInput
                        v-model={stringDate}
                        onClear={() => {
                            DatePickerExpose()?.clearValue()
                        }}
                    ></RangeInput>
                </Match>
            </Switch>
        </Popover>
    )
})

export const RangeInput = OriginComponent<
    {
        onClear?: () => void
    },
    HTMLDivElement,
    string[]
>((props) => {
    const wrapper = NullAtom<HTMLDivElement>(null)
    const isHovering = useElementHover(wrapper)
    return (
        <OriginDiv prop={props} ref={wrapper} class="inline-flex p-1  items-center rounded border hover:border-primary-600">
            <input type="text" class="outline-none w-28 px-2" readonly value={props.model()[0] ?? ''} />
            <Icon class="text-gray-400">
                <AiOutlineSwapRight></AiOutlineSwapRight>
            </Icon>
            <input type="text" class="outline-none w-28 px-2" readonly value={props.model()[1] ?? ''} />
            <Icon class="px-2 text-gray-400" onclick={props.onClear}>
                <Show when={!isHovering()} fallback={<AiOutlineCloseCircle></AiOutlineCloseCircle>}>
                    <AiOutlineCalendar></AiOutlineCalendar>
                </Show>
            </Icon>
        </OriginDiv>
    )
})
