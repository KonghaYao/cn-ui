import { NullAtom, OriginComponent, SignalToAtom, classNames, computed, createCtx, useSelect } from '@cn-ui/reactive'
import { BaseInput } from '../input/BaseInput'
import { Popover } from '../../popover'
import { useFocus } from 'solidjs-use'
import { For, Match, Signal, Switch, createEffect } from 'solid-js'
import { VirtualList } from '../../virtualList'
import { Icon } from '../../icon/Icon'
import { AiOutlineCheck, AiOutlineDown, AiOutlineSearch } from 'solid-icons/ai'
import { ClearControl } from '../input/utils'

export const SelectCtx = createCtx<ReturnType<typeof useSelect>>()

export const Select = OriginComponent<
    {
        options: SelectItemsType[]
        multiple?: boolean
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
    const inputText = computed(() => {
        const val = [...selectSystem.activeIds()][0]
        const item = props.options.find((i) => i.value === val)
        console.log('computed', val, item)
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
    return (
        <SelectCtx.Provider value={selectSystem}>
            <Popover
                v-model={focusing}
                trigger="none"
                content={() => (
                    <nav class="max-h-32 w-24">
                        <SelectPanel options={props.options} multiple={props.multiple}></SelectPanel>
                    </nav>
                )}
                placement="bottom-start"
            >
                {/* TODO full text search */}
                <BaseInput
                    v-model={inputText}
                    ref={input}
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
                        return (
                            <Icon>
                                <ClearControl {...expose} onClear={() => selectSystem.clearAll()}></ClearControl>
                            </Icon>
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

export const SelectPanel = (props: { options: SelectItemsType[]; multiple?: boolean }) => {
    const selectSystem = SelectCtx.use()
    const mapper = (item: SelectItemsType) => {
        return (
            <div
                role="option"
                class={classNames(
                    'grid grid-cols-12 items-center rounded-md transition-colors hover:bg-blue-600 hover:text-white cursor-pointer select-none px-2 mb-1',
                    selectSystem.isSelected(item.value.toString()) && 'bg-blue-600 text-white'
                )}
                onClick={() => {
                    selectSystem.changeSelected(item.value.toString())
                }}
            >
                <Icon class="col-span-4">{selectSystem.isSelected(item.value.toString()) && <AiOutlineCheck></AiOutlineCheck>}</Icon>
                <span class="col-span-8">{item.label ?? item.value}</span>
            </div>
        )
    }
    return (
        <>
            {props.options.length > 100 ? (
                <VirtualList each={props.options} estimateSize={24}>
                    {mapper}
                </VirtualList>
            ) : (
                <For each={props.options}>{mapper}</For>
            )}
        </>
    )
}
