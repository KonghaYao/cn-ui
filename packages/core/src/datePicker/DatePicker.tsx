import { Popover } from '../popover'
import { NullAtom, OriginComponent, OriginDiv, atom, classNames, computed } from '@cn-ui/reactive'
import { BaseInput, ClearControl, InputExpose } from '../input'
import { DatePanel, DatePanelProps } from './Panel/DatePanel'
import { Match, Show, Switch, createMemo } from 'solid-js'
import { DatePickerContext } from '@ark-ui/solid'
import { AiOutlineCalendar, AiOutlineCloseCircle, AiOutlineSwapRight } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import '../animation/cn-list.css'
import { useElementHover } from 'solidjs-use'
import { Flex } from '../container/Flex'
import { TransitionGroup } from 'solid-transition-group'
import { TagGroup } from '../tag/TagGroup'
import { BaseFormItemType, extendsBaseFormItemProp } from '../form/BaseFormItemType'

export interface DatePickerProps extends DatePanelProps, BaseFormItemType {
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

    const clearBtn = ({ isHovering }: InputExpose) => (
        <>
            <Show
                when={isHovering() && !props.disabled}
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
    )
    return (
        <Popover
            disabled={props.disabled}
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
                        {...extendsBaseFormItemProp(props)}
                        id={props.id}
                        readonly
                        v-model={createMemo(() => stringDate()[0] ?? '')}
                        suffixIcon={clearBtn}
                    ></BaseInput>
                }
            >
                <Match when={props.mode === 'multiple'}>
                    <BaseInput
                        {...extendsBaseFormItemProp(props)}
                        id={props.id}
                        placeholder="请输入日期"
                        prefixIcon={() => {
                            const multipleTags = computed(() =>
                                stringDate().map((i, index) => {
                                    return { label: i, value: props.model()[index] }
                                })
                            )
                            return (
                                <Flex class=" flex-nowrap gap-2" justify="start">
                                    <TransitionGroup name="cn-list">
                                        <TagGroup color="#a8a8a8" v-model={multipleTags} maxSize={3}></TagGroup>
                                    </TransitionGroup>
                                </Flex>
                            )
                        }}
                        readonly
                        suffixIcon={clearBtn}
                    ></BaseInput>
                </Match>
                <Match when={props.mode === 'range'}>
                    <RangeInput
                        inputProps={{ id: props.id, ...extendsBaseFormItemProp(props) }}
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
        inputProps: any
    },
    HTMLDivElement,
    string[]
>((props) => {
    const wrapper = NullAtom<HTMLDivElement>(null)
    const isHovering = useElementHover(wrapper)
    return (
        <OriginDiv
            prop={props}
            ref={wrapper}
            class={classNames(
                'cn-date-picker-range inline-flex p-1  items-center rounded border transition-colors ',
                props.inputProps.disabled && 'bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed',
                props.inputProps.error && 'border-red-300',
                !props.inputProps.disabled && !props.inputProps.error && 'hover:border-primary-400'
            )}
        >
            <input
                {...props.inputProps}
                name={props.inputProps?.name && props.inputProps.name + '_start'}
                type="text"
                placeholder="开始日期"
                class="flex-1 text-sm outline-none w-28 px-2"
                readonly
                value={props.model()[0] ?? ''}
            />
            <Icon class="text-gray-400">
                <AiOutlineSwapRight></AiOutlineSwapRight>
            </Icon>
            <input
                {...props.inputProps}
                name={props.inputProps?.name && props.inputProps.name + '_end'}
                type="text"
                placeholder="结束日期"
                class="flex-1 text-sm outline-none w-28 px-2"
                readonly
                value={props.model()[1] ?? ''}
            />
            <Icon class="px-2 text-gray-400" onclick={props.onClear}>
                <Show when={!isHovering() || props.inputProps.disabled} fallback={<AiOutlineCloseCircle></AiOutlineCloseCircle>}>
                    <AiOutlineCalendar></AiOutlineCalendar>
                </Show>
            </Icon>
        </OriginDiv>
    )
})
