import { NullAtom, OriginComponent, SignalToAtom, atom, classNames, computed, createCtx, useSelect } from '@cn-ui/reactive'
import { BaseInput } from '../input/BaseInput'
import { Popover } from '../../popover'
import { nextTick, useEventListener, useFocus } from 'solidjs-use'
import { Accessor, For, Signal, createEffect } from 'solid-js'
import { VirtualList } from '../../virtualList'
import { Icon } from '../../icon/Icon'
import { AiOutlineCheck, AiOutlineCloudDownload, AiOutlineDown, AiOutlineSearch } from 'solid-icons/ai'
import { ClearControl } from '../input/utils'
import { getLabelFromOptions } from './getLabelFromOptions'
import './index.css'
import { TagGroup } from '../../tag/Tag'
import { Flex } from '../../container'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

export const SelectCtx = createCtx<ReturnType<typeof useSelect>>()
export interface SelectProps {
    /** TODO 异步态监控 */
    options: SelectItemsType[]
    multiple?: boolean
    disabled?: boolean
    disabledOptions?: string[]
    onInput?: (text: string) => void
    filterable?: boolean
}

export const Select = OriginComponent<SelectProps, HTMLDivElement, string[]>((props) => {
    const selectSystem = useSelect({
        activeIds: computed(() => props.model() ?? []),
        multi: !!props.multiple
    })
    createEffect(() => {
        selectSystem.disabledSet(() => new Set(props.disabledOptions))
    })
    createEffect(() => {
        selectSystem.allRegistered((i) => {
            const set = new Set<string>()
            props.options.forEach((item) => {
                set.add(item.value.toString())
            })
            return set
        })
    })
    createEffect(() => {
        props.model(() => selectSystem.activeIdsArray())
    })
    const input = NullAtom<HTMLDivElement>(null)
    const inputText = atom('')

    const filteredOptions = computed(
        () => {
            if (!inputText() || props.filterable === false) return props.options
            return props.options.filter((i) => getLabelFromOptions(i).includes(inputText()))
        },
        { step: true, deps: [() => props.filterable, () => props.options] }
    )
    let keepState = inputText()
    const PopoverOpen = atom(false)
    const multipleTags = computed(() =>
        selectSystem.activeIdsArray().map((i) => ({
            text: i
        }))
    )
    return (
        <SelectCtx.Provider value={selectSystem}>
            <Popover
                v-model={PopoverOpen}
                initialFocusEl={input}
                sameWidth
                trigger="none"
                content={() => (
                    <nav class={classNames('max-h-32 w-full ', props.options.length <= 100 && 'overflow-y-auto')}>
                        <SelectPanel
                            onSelect={(item, state) => {
                                !props.multiple && inputText(state ? getLabelFromOptions(item) : '')
                                input()?.focus()
                            }}
                            options={filteredOptions()}
                            multiple={props.multiple}
                        ></SelectPanel>
                    </nav>
                )}
                placement="bottom-start"
            >
                {/* TODO full text search */}
                <BaseInput
                    v-model={inputText}
                    ref={input}
                    disabled={props.disabled}
                    oninput={() => {
                        filteredOptions.recomputed()
                        props.onInput?.(inputText())
                    }}
                    onfocus={() => {
                        keepState = inputText()
                    }}
                    onblur={() => {
                        inputText(() => keepState)
                    }}
                    prefixIcon={(expose) => {
                        if (!props.multiple) return
                        const [parent] = createAutoAnimate()
                        return (
                            <Flex class=" flex-nowrap gap-2" justify="start" ref={parent}>
                                <TagGroup
                                    v-model={multipleTags}
                                    maxSize={2}
                                    onClose={(item) => {
                                        selectSystem.changeSelected(item.text as string, false)
                                    }}
                                ></TagGroup>
                            </Flex>
                        )
                    }}
                    suffixIcon={(expose) => {
                        return (
                            <>
                                <Icon>{!props.disabled && <ClearControl {...expose} onClear={() => selectSystem.clearAll()}></ClearControl>}</Icon>
                                <Icon>{PopoverOpen() ? <AiOutlineSearch color="#777"></AiOutlineSearch> : <AiOutlineDown color="#777"></AiOutlineDown>}</Icon>
                            </>
                        )
                    }}
                ></BaseInput>
            </Popover>
        </SelectCtx.Provider>
    )
})

export interface SelectItemsType {
    label?: string | number
    value: string | number
}

export const SelectPanel = (props: { options: SelectItemsType[]; multiple?: boolean; onSelect?: (item: SelectItemsType, state: boolean) => void }) => {
    const selectSystem = SelectCtx.use()
    const innerContent = (item: SelectItemsType) => (
        <>
            <Icon class="col-span-4">{selectSystem.isSelected(item.value.toString()) && <AiOutlineCheck></AiOutlineCheck>}</Icon>
            <span class="col-span-8">{item.label ?? item.value}</span>
        </>
    )
    const VoidSlot = () => <span>无数据</span>
    const parentClass = 'cn-select-option grid grid-cols-12 items-center transition-colors select-none px-2 rounded-md'

    const normalClass = 'hover:bg-gray-100'
    const selectedClass = 'cn-selected bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
    const disabledClass = 'text-gray-400 cursor-not-allowed'
    const createClass = (item: SelectItemsType) => {
        const isSelected = selectSystem.isSelected(item.value.toString())
        const isDisabled = selectSystem.disabledSet().has(item.value.toString())
        return classNames(parentClass, isSelected && selectedClass, isDisabled && disabledClass, !isSelected && !isDisabled && normalClass)
    }
    const selectItem = (item: SelectItemsType) => {
        const state = selectSystem.changeSelected(item.value.toString())
        props.onSelect?.(item, state)
    }
    return (
        <>
            {props.options.length > 100 ? (
                <VirtualList each={props.options} estimateSize={24} fallback={VoidSlot}>
                    {(item, index, { itemClass, itemRef }) => {
                        createEffect(() => {
                            itemClass(createClass(item))
                            useEventListener(itemRef, 'click', () => {
                                selectItem(item)
                            })
                        })
                        return <>{innerContent(item)}</>
                    }}
                </VirtualList>
            ) : (
                <For each={props.options} fallback={VoidSlot()}>
                    {(item) => {
                        return (
                            <div
                                role="option"
                                class={createClass(item)}
                                onClick={() => {
                                    selectItem(item)
                                }}
                            >
                                {innerContent(item)}
                            </div>
                        )
                    }}
                </For>
            )}
        </>
    )
}