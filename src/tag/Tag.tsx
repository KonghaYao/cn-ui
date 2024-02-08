import { ArrayAtom, JSXSlot, OriginComponent, OriginDiv, atom, classNames, computed, ensureFunctionResult, useSelect } from '@cn-ui/reactive'
import { Icon } from '../icon/Icon'
import { AiOutlineClose } from 'solid-icons/ai'
import { For, Show, createMemo } from 'solid-js'

export const Tag = OriginComponent<{
    color?: string
    icon?: JSXSlot
    onClose?: () => void
    closeable?: boolean
    inline?: boolean
}>((props) => {
    return (
        <OriginDiv
            prop={props}
            class={classNames(props.inline === false ? 'flex' : 'inline-flex', ' flex-row items-center px-2 rounded-md select-none border text-sm text-light')}
            style={{
                'background-color': props.color ?? '#eee'
            }}
        >
            {ensureFunctionResult(props.icon)}
            <span>{props.children}</span>
            <Show when={props.closeable}>
                <Icon
                    class="cn-clear-btn cursor-pointer"
                    onclick={() => {
                        props.onClose?.()
                    }}
                >
                    <AiOutlineClose color="#777" />
                </Icon>
            </Show>
        </OriginDiv>
    )
})

interface TagGroupOptions {
    text: JSXSlot
    icon?: JSXSlot
    color?: string
}

interface TagGroupProps {
    maxSize?: number
    onClose?: (item: TagGroupOptions) => void
}

export const TagGroup = OriginComponent<TagGroupProps, HTMLDivElement, TagGroupOptions[]>((props) => {
    const group = ArrayAtom<TagGroupOptions[]>(props.model)
    const isHideSomeItems = createMemo(() => {
        if (!props.maxSize) return false
        return group().length > props.maxSize
    })
    const visibleItems = createMemo(() => {
        return isHideSomeItems() ? group().slice(0, props.maxSize) : group()
    })
    return (
        <>
            <For each={visibleItems()}>
                {(item) => {
                    return (
                        <Tag
                            icon={ensureFunctionResult(item.icon)}
                            color={item.color}
                            onClose={() => {
                                group.remove(item)
                                props.onClose?.(item)
                            }}
                            closeable
                        >
                            {ensureFunctionResult(item.text)}
                        </Tag>
                    )
                }}
            </For>
            <Show when={isHideSomeItems()}>
                <Tag>{group().length - props.maxSize!}+</Tag>
            </Show>
        </>
    )
})
