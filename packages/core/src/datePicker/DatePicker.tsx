import type { DatePickerContext } from "@ark-ui/solid";
import { NullAtom, OriginComponent, OriginDiv, classNames, computed, dayjs } from "@cn-ui/reactive";
import { AiOutlineCalendar, AiOutlineCloseCircle, AiOutlineSwapRight } from "solid-icons/ai";
import { Match, Show, Switch, createMemo } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { useElementHover } from "solidjs-use";
import "../animation/cn-list.css";
import { Calendar, type CalendarProps } from "../calendar";
import { Flex } from "../container/Flex";
import { type BaseFormItemType, extendsBaseFormItemProp } from "../form/BaseFormItemType";
import { Icon } from "../icon/Icon";
import { BaseInput, ClearControl, type InputExpose } from "../input";
import { Popover } from "../popover";
import { TagGroup } from "../tag";

export interface DatePickerProps extends CalendarProps, BaseFormItemType {
    format?: string;
}

export const DatePicker = OriginComponent<DatePickerProps, HTMLDivElement, Date[]>((props) => {
    const innerModel = props.model.reflux(
        props.model().map((i) => dayjs(i)),
        (inner) => inner.map((i) => i.toDate()),
    );
    const stringDate = computed(() => {
        return innerModel().map((i) => i.format(props.format ?? "YYYY-MM-DD"));
    });
    const DatePickerExpose = NullAtom<ReturnType<DatePickerContext>>(null);

    const clearBtn = ({ isHovering }: InputExpose) => (
        <>
            <Show
                when={isHovering() && !props.disabled}
                fallback={
                    <Icon>
                        <AiOutlineCalendar />
                    </Icon>
                }
            >
                <ClearControl
                    onClear={() => {
                        DatePickerExpose()?.clearValue();
                    }}
                />
            </Show>
        </>
    );
    return (
        <Popover
            trigger="focus"
            sameWidth
            disabled={props.disabled}
            class="p-2"
            content={() => <Calendar view={props.view} mode={props.mode} v-model={innerModel} />}
        >
            <Switch
                fallback={
                    <BaseInput
                        {...extendsBaseFormItemProp(props)}
                        id={props.id}
                        readonly
                        v-model={createMemo(() => stringDate()[0] ?? "")}
                        suffixIcon={clearBtn}
                    />
                }
            >
                <Match when={props.mode === "multiple"}>
                    <BaseInput
                        {...extendsBaseFormItemProp(props)}
                        id={props.id}
                        placeholder="请输入日期"
                        prefixIcon={() => {
                            const multipleTags = computed(() =>
                                stringDate().map((i, index) => {
                                    return { label: i, value: props.model()[index] };
                                }),
                            );
                            return (
                                <Flex class=" flex-nowrap gap-2" justify="start">
                                    <TransitionGroup name="cn-list">
                                        {/* @ts-ignore */}
                                        <TagGroup
                                            color="#a8a8a8"
                                            v-model={multipleTags}
                                            maxSize={3}
                                        />
                                    </TransitionGroup>
                                </Flex>
                            );
                        }}
                        readonly
                        suffixIcon={clearBtn}
                    />
                </Match>
                <Match when={props.mode === "range"}>
                    <RangeInput
                        inputProps={{
                            id: props.id,
                            ...extendsBaseFormItemProp(props),
                        }}
                        v-model={stringDate}
                        onClear={() => {
                            DatePickerExpose()?.clearValue();
                        }}
                    />
                </Match>
            </Switch>
        </Popover>
    );
});

export const RangeInput = OriginComponent<
    {
        onClear?: () => void;
        inputProps: any;
    },
    HTMLDivElement,
    string[]
>((props) => {
    const wrapper = NullAtom<HTMLDivElement>(null);
    const isHovering = useElementHover(wrapper);
    return (
        <OriginDiv
            prop={props}
            ref={wrapper}
            class={classNames(
                "cn-date-picker-range inline-flex p-1  items-center rounded border transition-colors ",
                props.inputProps.disabled &&
                    "bg-gray-100 text-gray-400 opacity-50 cursor-not-allowed",
                props.inputProps.error && "border-red-300",
                !props.inputProps.disabled && !props.inputProps.error && "hover:border-primary-400",
            )}
        >
            <input
                {...props.inputProps}
                name={props.inputProps?.name && `${props.inputProps.name}_start`}
                type="text"
                placeholder="开始日期"
                class="flex-1 text-sm outline-none w-28 px-2"
                readonly
                value={props.model()[0] ?? ""}
            />
            <Icon class="text-gray-400">
                <AiOutlineSwapRight />
            </Icon>
            <input
                {...props.inputProps}
                name={props.inputProps?.name && `${props.inputProps.name}_end`}
                type="text"
                placeholder="结束日期"
                class="flex-1 text-sm outline-none w-28 px-2"
                readonly
                value={props.model()[1] ?? ""}
            />
            <Icon class="px-2 text-gray-400" onclick={props.onClear}>
                <Show
                    when={!isHovering() || props.inputProps.disabled}
                    fallback={<AiOutlineCloseCircle />}
                >
                    <AiOutlineCalendar />
                </Show>
            </Icon>
        </OriginDiv>
    );
});
