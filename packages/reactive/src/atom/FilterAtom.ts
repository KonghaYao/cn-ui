import { debounce, throttle } from 'lodash-es'
import { atom } from './atom'
import { useEffectWithoutFirst } from './useEffect'
import { Accessor } from 'solid-js'

export function DebounceAtom<T>(a: Accessor<T>, debounceTime: number = 150) {
    let lastVal = a()
    const newA = atom(lastVal)
    useEffectWithoutFirst(
        debounce(() => {
            const data = a()

            data !== undefined && newA(() => data as T)
        }, debounceTime),
        [a]
    )
    return newA
}
export function ThrottleAtom<T>(a: Accessor<T>, debounceTime: number = 150, options?: Parameters<typeof throttle>[2]) {
    let lastVal = a()
    const newA = atom(lastVal)
    useEffectWithoutFirst(
        throttle(
            () => {
                const data = a()
                data !== undefined && newA(() => data as T)
            },
            debounceTime,
            options
        ),
        [a]
    )
    return newA
}
export { throttle, debounce }
