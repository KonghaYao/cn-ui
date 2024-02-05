import { JSXSlot, NullAtom, OriginComponent, atom, classNames, computed, ensureFunctionResult, toCSSPx, useMapper } from '@cn-ui/reactive'
import { children, createEffect, onMount } from 'solid-js'
import { Instance, Placement, createPopper } from '@popperjs/core'
import { onClickOutside, useElementHover, useEventListener, watch } from 'solidjs-use'
export interface PopoverProps {
    content: JSXSlot
    placement?: Placement
    trigger?: 'click' | 'hover' | 'focus' | 'none'
    padding?: string | number
}

export const Popover = OriginComponent<PopoverProps, HTMLDivElement, boolean>((props) => {
    const tooltip = NullAtom<HTMLDivElement>(null)
    const arrow = NullAtom<HTMLDivElement>(null)
    const c = children(() => props.children)
    const button = computed(() => c.toArray()[0] as HTMLDivElement)
    const hidden = atom(true)
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
            if (isHovered() && state === false) {
                // 还浮动在 panel 上时，不进行关闭
                return
            }
            hidden(!state)
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
            click: 'click',
            none: null
        })
        createEffect<(() => void)[]>((clean = []) => {
            clean.forEach((i) => i())
            const cleanUp: (() => void)[] = []
            if (key() === null) return []
            if (Array.isArray(key())) {
                const [add, remove] = key()!
                cleanUp.push(useEventListener(button(), add, show))
                cleanUp.push(useEventListener(button(), remove, hide))
            } else if (typeof key() === 'string') {
                cleanUp.push(useEventListener(button(), key()!, () => toggle()))
            }
            return cleanUp
        })
        createEffect(() => {
            props.model() ? show() : hide()
        })
    })
    const isHovered = useElementHover(tooltip)
    return (
        <>
            {c.toArray()}
            <div class={classNames('cn-popover-wrapper p-2', hidden() && !isHovered() && 'hidden')} ref={tooltip} style={{ '--cn-popover-bg': 'white' }}>
                <div class="shadow-lg border border-gray-300 rounded-lg" style={{ padding: toCSSPx(props.padding, '0.5rem') }}>
                    {ensureFunctionResult(props.content)}
                </div>
            </div>
        </>
    )
})
