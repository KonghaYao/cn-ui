import { ArrayAtom, JSXSlot, OriginComponent, ensureFunctionResult } from '@cn-ui/reactive'
import { For, Show, createMemo } from 'solid-js'
import { Tag } from './Tag'
import { Key } from '@solid-primitives/keyed'
export interface TagGroupOptions {
    id?: string

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
        const showing = group()
            .slice(-(props.maxSize ?? 2))
            .reverse()
        if (isHideSomeItems())
            return [
                ...showing,
                {
                    id: '$index',
                    text: group().length - props.maxSize! + '+'
                }
            ]
        return showing
    })
    return (
        <Key by={(i) => i.id ?? i.text} each={visibleItems()}>
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
    )
})
