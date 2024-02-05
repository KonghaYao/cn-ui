import { NullAtom, OriginComponent, SignalToAtom, classNames, computed, createCtx, useSelect } from '@cn-ui/reactive'
import { BaseInput } from '../input/BaseInput'
import { Popover } from '../../popover'
import { useEventListener, useFocus } from 'solidjs-use'
import { Accessor, For, Signal, createEffect } from 'solid-js'
import { VirtualList } from '../../virtualList'
import { Icon } from '../../icon/Icon'
import { AiOutlineCheck } from 'solid-icons/ai'
import { ClearControl } from '../input/utils'
import { getLabelFromOptions } from './getLabelFromOptions'
import './index.css'

export const SelectCtx = createCtx<ReturnType<typeof useSelect>>()
export const Select = OriginComponent<
    {
        options: SelectItemsType[]
        multiple?: boolean
        disabled?: boolean
        disabledOptions?: string[]
    },
    HTMLDivElement,
    string[]
>((props) => {
    const input = NullAtom<HTMLDivElement>(null)
    const focusing = SignalToAtom(useFocus(input, { initialValue: true }) as Signal<boolean>)
    const selectSystem = useSelect({
        activeIds: computed(() => props.model() ?? []),
        multi: !!props.multiple
    })
    createEffect(() => {
        selectSystem.disabledSet(() => new Set(props.disabledOptions))
    })
    const inputText = computed(() => {
        const val = [...selectSystem.activeIds()][0]
        const item = props.options.find((i) => i.value === val)
        return (item?.label ?? item?.value ?? '').toString()
    })
    createEffect(() => {
        props.options.map((item) => {
            selectSystem.register(item.value.toString(), false)
        })
    })
    createEffect(() => {
        props.model(() => selectSystem.activeIdsArray())
    })

    const filteredOptions = computed(
        () => {
            if (!inputText()) return props.options
            return props.options.filter((i) => getLabelFromOptions(i).includes(inputText()))
        },
        { step: true }
    )
    return (
        <SelectCtx.Provider value={selectSystem}>
            <Popover
                v-model={focusing}
                trigger="none"
                content={() => (
                    // TODO width
                    <nav class={classNames('max-h-32 w-48 ', props.options.length <= 100 && 'overflow-y-scroll')}>
                        <SelectPanel options={filteredOptions()} multiple={props.multiple}></SelectPanel>
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
                    }}
                    onblur={() => {
                        inputText.recomputed()
                    }}
                    prefixIcon={(expose) => {
                        if (!props.multiple) return
                        // TODO tags group
                        return (
                            <div>
                                {selectSystem
                                    .activeIdsArray()
                                    .slice(0, 2)
                                    .map((i) => i)}
                                {selectSystem.activeIdsArray().length > 2 && <span>{selectSystem.activeIdsArray().length - 1} +</span>}
                            </div>
                        )
                    }}
                    suffixIcon={(expose) => {
                        return <Icon>{!props.disabled && <ClearControl {...expose} onClear={() => selectSystem.clearAll()}></ClearControl>}</Icon>
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

export const SelectPanel = (props: { options: SelectItemsType[]; multiple?: boolean }) => {
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
    return (
        <>
            {props.options.length > 100 ? (
                <VirtualList each={props.options} estimateSize={24} fallback={VoidSlot}>
                    {(item, index, { itemClass, itemRef }) => {
                        createEffect(() => {
                            itemClass(createClass(item))
                            useEventListener(itemRef, 'click', () => {
                                selectSystem.changeSelected(item.value.toString())
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
                                    selectSystem.changeSelected(item.value.toString())
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
