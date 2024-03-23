import { atom } from '@cn-ui/reactive'
import { Accessor, onCleanup, onMount } from 'solid-js'
import { useResizeObserver, watch } from 'solidjs-use'

export const useAutoResize = (sizer: Accessor<HTMLElement | null>) => {
    const width$ = atom(0)
    const height$ = atom(0)

    let resizerStopper: ReturnType<typeof useResizeObserver>['stop']
    onMount(() => {
        resizerStopper = useResizeObserver(sizer, ([entry]) => {
            const { width, height } = entry.contentRect
            const { paddingLeft, paddingRight, paddingTop, paddingBottom } = getComputedStyle(entry.target)

            const left = Number.parseInt(paddingLeft) || 0
            const right = Number.parseInt(paddingRight) || 0
            const top = Number.parseInt(paddingTop) || 0
            const bottom = Number.parseInt(paddingBottom) || 0

            width$(width - left - right)
            height$(height - top - bottom)
        }).stop
    })

    onCleanup(() => {
        resizerStopper?.()
    })

    return {
        sizer,
        width: width$,
        height: height$
    }
}
