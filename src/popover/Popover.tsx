import { JSXSlot, NullAtom, OriginComponent, computed, ensureFunctionResult, useMapper } from '@cn-ui/reactive'
import { children, createEffect, onMount } from 'solid-js'
import { Instance, Placement, createPopper } from '@popperjs/core'
import { useEventListener, watch } from 'solidjs-use'
export interface PopoverProps {
    content: JSXSlot
    placement?: Placement
    trigger?: 'click' | 'hover' | 'focus'
}

export const Popover = OriginComponent<PopoverProps, HTMLDivElement, boolean>((props) => {
    const tooltip = NullAtom<HTMLDivElement>(null)
    const arrow = NullAtom<HTMLDivElement>(null)
    const c = children(() => props.children)
    const button = computed(() => c.toArray()[0] as HTMLDivElement)
    let popperInstance: Instance
    onMount(() => {
        popperInstance = createPopper(button(), tooltip()!, {
            modifiers: [
                {
                    name: 'arrow',
                    options: {
                        element: arrow()
                    }
                }
            ]
        })

        watch(
            () => props.placement,
            () => {
                popperInstance.setOptions((options) => ({
                    ...options,
                    placement: props.placement,
                    modifiers: [...options.modifiers!]
                }))
                popperInstance.update()
            }
        )
        const toggle = (state = !props.model()) => {
            tooltip()!.classList[state ? 'remove' : 'add']('hidden')
            popperInstance.setOptions((options) => ({
                ...options,
                modifiers: [...options.modifiers!, { name: 'eventListeners', enabled: state }]
            }))
            popperInstance.update()
            props.model(state)
        }
        const show = () => toggle(true)
        const hide = () => toggle(false)

        const key = useMapper(() => props.trigger ?? 'click', {
            focus: ['focus', 'blur'],
            hover: ['mouseenter', 'mouseleave'],
            click: 'click'
        })
        createEffect<(() => void)[]>((clean = []) => {
            clean.forEach((i) => i())
            const cleanUp: (() => void)[] = []
            if (Array.isArray(key())) {
                const [add, remove] = key()
                cleanUp.push(useEventListener(button(), add, show))
                cleanUp.push(useEventListener(button(), remove, hide))
            } else if (typeof key() === 'string') {
                cleanUp.push(useEventListener(button(), key(), () => toggle()))
            }
            return cleanUp
        })
        props.model() ? show() : hide()
    })
    return (
        <>
            {c.toArray()}
            <div class="cn-popover-wrapper  p-2 hidden" ref={tooltip} style={{ '--cn-popover-bg': 'white' }}>
                <div class="shadow-lg border border-gray-300 rounded-lg p-2">{ensureFunctionResult(props.content)}</div>
            </div>
        </>
    )
})
