import { ArrayAtom, JSXSlot, OriginComponent, ensureFunctionResult } from '@cn-ui/reactive'
import { For, Show, createMemo } from 'solid-js'
import { Tag } from './Tag'
import { Key } from '@solid-primitives/keyed'
export interface TagGroupOptions {
    text: JSXSlot
    icon?: JSXSlot
    color?: string
}

export interface TagGroupProps {
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
        return group()
            .slice(-(props.maxSize ?? 2))
            .reverse()
    })
    return (
        <>
            <Key by="text" each={visibleItems()}>
                {(item) => {
                    return (
                        <Tag
                            icon={ensureFunctionResult(item().icon)}
                            color={item().color}
                            onClose={() => {
                                group.remove(item())
                                props.onClose?.(item())
                            }}
                            closeable
                        >
                            {ensureFunctionResult(item().text)}
                        </Tag>
                    )
                }}
            </Key>
            <Show when={isHideSomeItems()}>
                <Tag>{group().length - props.maxSize!}+</Tag>
            </Show>
        </>
    )
})
