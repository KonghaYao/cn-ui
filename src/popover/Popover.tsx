import { JSXSlot, NullAtom, OriginComponent, computed, ensureFunctionResult } from '@cn-ui/reactive'
import { Popover as _Popover, PopoverRootProps as $PopoverProps, usePopoverContext } from '@ark-ui/solid'

export interface PopoverProps extends NonNullable<$PopoverProps['positioning']> {
    content: JSXSlot
    trigger?: 'click' | 'hover' | 'focus' | 'none'
    initialFocusEl?: $PopoverProps['initialFocusEl']
    wrapperClass?: string
    disabled?: boolean
}
import './index.css'
import { children, createEffect, createMemo } from 'solid-js'
import { pick } from 'lodash-es'
import { spread } from './spread'
import { MaybeAccessor, useElementHover } from 'solidjs-use'

export const Popover = OriginComponent<PopoverProps, HTMLDivElement, boolean>((props) => {
    const positioning = createMemo(() =>
        pick(props, [
            'placement',
            'strategy',
            'offset',
            'gutter',
            'shift',
            'overflowPadding',
            'arrowPadding',
            'flip',
            'slide',
            'overlap',
            'sameWidth',
            'fitViewport',
            'boundary',
            'listeners',
            'onComplete',
            'onPositioned',
            'onCleanup',
            'getAnchorRect',
            'updatePosition'
        ])
    )
    const c = children(() => props.children)
    const child = createMemo(() => {
        return c.toArray()[0] as HTMLElement
    })
    const positioner = NullAtom<HTMLDivElement>(null)

    const { hovering } = usePopoverHover([child, positioner])

    createEffect(() => {
        props.trigger === 'hover' && props.model(hovering())
    })
    return (
        <>
            <_Popover.Root
                initialFocusEl={props.initialFocusEl}
                autoFocus={false}
                closeOnInteractOutside={props.trigger === 'hover' ? false : true}
                portalled
                lazyMount={true}
                open={props.model()}
                positioning={positioning()}
                onOpenChange={(value) => props.model(value.open)}
            >
                <PopoverTrigger disabled={props.disabled} as={child}></PopoverTrigger>

                <_Popover.Positioner ref={positioner}>
                    <_Popover.Content class="popover__content outline-none bg-design-pure rounded-md flex flex-col z-50 p-2 select-none">
                        <_Popover.Arrow class="popover__arrow">
                            <_Popover.ArrowTip class="popover__arrowTip" />
                        </_Popover.Arrow>
                        <div class={props.wrapperClass}>{ensureFunctionResult(props.content)}</div>
                    </_Popover.Content>
                </_Popover.Positioner>
            </_Popover.Root>
            {/* 只渲染第一个子元素为 触发器，其余渲染为额外元素 */}
            {c.toArray().slice(1)}
        </>
    )
})
export const usePopoverHover = (els: MaybeAccessor<EventTarget | null | undefined>[]) => {
    const hoveringState = els.map((el) => useElementHover(el, { delayLeave: 300 }))
    const hovering = computed(() => hoveringState.some((i) => i()))
    return {
        hovering
    }
}

export const PopoverTrigger = (props: { disabled?: boolean; as: () => HTMLElement }) => {
    const api = usePopoverContext()
    if (!props.as()) return null
    const p = api().triggerProps
    console.log(api().triggerProps)
    const wrapperDisabled = (fn: any) => {
        return function (this: any, ...args: any[]) {
            if (props.disabled) return
            return (fn as Function).apply(this, args)
        }
    }
    p.onClick = wrapperDisabled(p.onClick)
    spread(props.as(), p)
    return props.as()
}
