import {
    type Atom,
    DebounceAtom,
    NullAtom,
    OriginComponent,
    atom,
    computed,
    debounce,
    extendsEvent,
    useSelect,
} from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";
import { AiOutlineCheck, AiOutlineDown, AiOutlineSearch } from "solid-icons/ai";
import { type Accessor, createEffect, createMemo } from "solid-js";
import { TransitionGroup } from "solid-transition-group";
import { watch } from "solidjs-use";
import "../animation/cn-list.css";
import { Flex } from "../container";
import { type BaseFormItemType, extendsBaseFormItemProp } from "../form/BaseFormItemType";
import { Icon } from "../icon/Icon";
import { BaseInput } from "../input/BaseInput";
import { ClearControl } from "../input/utils";
import { Popover } from "../popover";
import { useFocusIn } from "../popover/composable/useFocusIn";
import { TagGroup } from "../tag/TagGroup";
import { SelectCtx } from "./SelectCtx";
import { SelectPanel, type SelectPanelProps } from "./SelectPanel";
import { getLabelFromOptions } from "./getLabelFromOptions";
import "./index.css";

export interface SelectProps extends BaseFormItemType {
    /** TODO 异步态监控 */
    options: SelectOptionsType[];
    multiple?: boolean;
    disabledOptions?: string[];
    onInput?: (text: string) => void;
    filterable?: boolean;

    optionRender?: SelectPanelProps["children"];
}

/** 抽离的 input 的展示逻辑 */
const useInputSearch = (
    inputRef: Atom<HTMLInputElement | null>,
    inputText: Atom<string>,
    getPlaceholder: Accessor<string>,
    selectedLabel: Accessor<string>,
) => {
    const [isFocusing] = useFocusIn(inputRef);
    const whenFocus = () => {
        inputRef()!.placeholder = inputText() || getPlaceholder();
        inputText("");
    };
    const whenBlur = () => {
        inputRef()!.placeholder = getPlaceholder();
        inputText(() => selectedLabel());
    };

    watch(
        isFocusing,
        debounce({ delay: 200 }, (val: boolean) => (val ? whenFocus() : whenBlur())),
    );
    return { isFocusing };
};

export const Select = OriginComponent<SelectProps, HTMLDivElement, string[]>(
    (props) => {
        const selectSystem = useSelect(() => props.options, {
            multi: () => !!props.multiple,
        });
        selectSystem.syncIdArrayModel(props.model);
        createEffect(() => {
            props.disabledOptions?.forEach((id) => {
                selectSystem.disableById(id);
            });
        });
        const input = NullAtom<HTMLInputElement>(null);

        const selectedText = computed(() =>
            props.multiple
                ? ""
                : selectSystem
                      .selected()
                      .map((i) => i.label)
                      .join("/"),
        );
        const inputText = atom(selectedText());
        useInputSearch(input, inputText, () => props.placeholder ?? "请选择", selectedText);
        // fix: 当外部 model 触发时，同步 inputText
        createEffect(() => inputText(() => selectedText()));

        const PopoverOpen = atom(false);
        const multipleTags = DebounceAtom(
            createMemo(() => selectSystem.selected()),
            500,
        );
        const wrapper = NullAtom<HTMLSpanElement>(null);
        const filteredOptions = computed(() => {
            if (!PopoverOpen() || !inputText() || !props.filterable) {
                return props.options;
            }
            // 单选选中状态返回所有
            if (!selectSystem.multi() && selectSystem.selected().length) {
                return props.options;
            }
            return props.options.filter((i) => getLabelFromOptions(i).includes(inputText()));
        });
        return (
            <SelectCtx.Provider value={selectSystem}>
                <BaseInput
                    id={props.id}
                    v-model={inputText}
                    ref={input}
                    wrapperRef={wrapper}
                    class={props.class("cn-select-input")}
                    {...extendsBaseFormItemProp(props)}
                    readonly={!props.filterable}
                    {...extendsEvent(props)}
                    prefixIcon={() => {
                        if (!props.multiple) return;

                        return (
                            <Flex
                                class="cn-selected-tags flex-nowrap gap-2"
                                justify="start"
                                role="list"
                            >
                                <TransitionGroup name="cn-list">
                                    <TagGroup
                                        color="#a8a8a8"
                                        v-model={multipleTags}
                                        maxSize={2}
                                        closeable
                                        onClose={(item) => {
                                            if (item.value) selectSystem.unselect(item);
                                        }}
                                    />
                                </TransitionGroup>
                            </Flex>
                        );
                    }}
                    suffixIcon={(expose) => {
                        return (
                            <>
                                {!props.disabled && (
                                    <ClearControl
                                        {...expose}
                                        onClear={() => {
                                            selectSystem.clearAll();
                                        }}
                                    />
                                )}
                                <Icon>
                                    {PopoverOpen() ? (
                                        <AiOutlineSearch color="#777" />
                                    ) : (
                                        <AiOutlineDown color="#777" />
                                    )}
                                </Icon>
                            </>
                        );
                    }}
                />
                <Popover
                    aria-label={props["aria-label"] ? `${props["aria-label"]} tooltip` : undefined}
                    popoverTarget={wrapper()!}
                    disabled={props.disabled}
                    v-model={PopoverOpen}
                    sameWidth
                    trigger="focus"
                    content={() => (
                        <SelectPanel
                            aria-label={
                                props["aria-label"] ? `${props["aria-label"]} panel` : undefined
                            }
                            onSelected={(item, state) => {
                                // 单选模式下，清空
                                !props.multiple &&
                                    inputText(state ? getLabelFromOptions(item) : "");
                                input()?.focus();
                            }}
                            options={filteredOptions()}
                            selectedIconSlot={(item) => {
                                return (
                                    <Icon class="w-6 flex-none px-1 text-primary-400">
                                        {selectSystem.isSelected(item!) && <AiOutlineCheck />}
                                    </Icon>
                                );
                            }}
                        >
                            {props.optionRender as any}
                        </SelectPanel>
                    )}
                />
            </SelectCtx.Provider>
        );
    },
    { modelValue: [] },
);
