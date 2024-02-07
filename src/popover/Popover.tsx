import { JSXSlot, OriginComponent, ensureFunctionResult } from '@cn-ui/reactive'
import { Popover, PopoverRootProps as $PopoverProps, usePopoverContext } from '@ark-ui/solid'
import { Portal } from 'solid-js/web'
export interface PopoverProps extends NonNullable<$PopoverProps['positioning']> {
    content: JSXSlot
    trigger?: 'click' | 'hover' | 'focus' | 'none'
    initialFocusEl?: $PopoverProps['initialFocusEl']
}
import './index.css'
import { children, createMemo } from 'solid-js'
import { pick } from 'lodash-es'
import { spread } from './spread'
const _Popover = OriginComponent<PopoverProps, HTMLDivElement, boolean>((props) => {
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
        const doms = c.toArray()
        if (doms.length !== 1) throw new Error('Popover need only 1 child!')
        return doms[0] as HTMLElement
    })
    return (
        <Popover.Root
            initialFocusEl={props.initialFocusEl}
            autoFocus={false}
            closeOnInteractOutside={true}
            portalled
            lazyMount={true}
            open={props.model()}
            positioning={positioning()}
            onOpenChange={(value) => props.model(value.open)}
        >
            <PopoverTrigger as={child}></PopoverTrigger>
            <Portal>
                <Popover.Positioner>
                    <Popover.Content class="popover__content outline-none bg-white rounded-md flex flex-col z-50 p-2">
                        <Popover.Arrow class="popover__arrow">
                            <Popover.ArrowTip class="popover__arrowTip" />
                        </Popover.Arrow>
                        <div>{ensureFunctionResult(props.content)}</div>
                    </Popover.Content>
                </Popover.Positioner>
            </Portal>
        </Popover.Root>
    )
})
export { _Popover as Popover }
export const PopoverTrigger = (props: { as: () => HTMLElement }) => {
    const api = usePopoverContext()
    spread(props.as(), api().triggerProps)
    return props.as()
}
