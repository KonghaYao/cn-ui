import { JSXSlot, OriginComponent, classNames, computed, ensureFunctionResult } from "@cn-ui/reactive"
import { VirtualList } from "../virtualList"
import { flatLoop } from "./flatLoop"
import { For, Show, createEffect } from "solid-js"
import { Flex } from "../container"
import { Icon } from "../icon/Icon"
import { AiOutlineMore, AiOutlineRight } from "solid-icons/ai"

export interface GroupListConfigWithValue {
    label?: string
    /** @private */
    level?: number
    value: string
    disabled?: boolean
    /** 在此之后显示分隔符号 */
    withSeparate?: boolean
    description?: JSXSlot
    icon?: JSXSlot
}
export interface GroupListConfigWithOptions {
    /** @private */
    level?: number
    label: string

    options: CommonGroupListConfig[]
}
export type CommonGroupListConfig = (GroupListConfigWithValue | GroupListConfigWithOptions)

export interface GroupListProps {
    options: CommonGroupListConfig[]
    /** 收起子类*/
    fold?: boolean
}
const isGroupListConfigWithOptions = (item: CommonGroupListConfig) => {
    if ('options' in item) return true
    return false
}
export const GroupList = OriginComponent<GroupListProps>((props) => {

    const flatOptions = computed(() => {
        if (props.fold) return props.options
        return flatLoop(props.options as any, []) as CommonGroupListConfig[]
    })
    const innerContent = (item: CommonGroupListConfig) => {
        const isHeader = computed(() => isGroupListConfigWithOptions(item) && !props.fold);
        return <>
            <div
                class={classNames(
                    isHeader() ? 'text-design-h2' : 'hover:bg-design-hover',
                    'w-full rounded-md transition-transform cursor-pointer',
                )}
            >
                <div
                    class={classNames(
                        isHeader() && 'text-design-h2',
                        'w-full px-1 py-1'
                    )}

                >
                    <Show when={!isHeader()}>
                        <Icon class='w-4 h-4 mr-2'>
                            {ensureFunctionResult((item as GroupListConfigWithValue).icon)}
                        </Icon>
                    </Show>

                    <span class="w-24 inline-flex justify-between">
                        <span>

                            {item.label ?? (item as GroupListConfigWithValue).value}
                        </span>
                        <span>

                            {ensureFunctionResult((item as GroupListConfigWithValue).description)}
                        </span>
                    </span>

                    <Show when={!isHeader() && item.options}>
                        <Icon class='w-4 h-4'>
                            <AiOutlineRight></AiOutlineRight>
                        </Icon>
                    </Show>
                </div>
            </div>
            <Show when={(item as GroupListConfigWithValue).withSeparate}>
                <div class="h-px w-full bg-design-border"></div>
            </Show>
        </>

    }

    const VoidSlot = () => <span>无数据</span>

    return (
        <>
            {flatOptions().length > 100 ? (
                <VirtualList each={flatOptions()} estimateSize={24} fallback={VoidSlot}>
                    {(item, index) => {
                        return <>{innerContent(item)}</>
                    }}
                </VirtualList>
            ) : (
                <Flex vertical justify="start" class='p-2 shadow-3 rounded-md'>
                    <For each={flatOptions()} fallback={VoidSlot()}>
                        {(item) => {
                            return (
                                <>
                                    {innerContent(item)}
                                </>
                            )
                        }}
                    </For>
                </Flex>
            )}
        </>
    )
})