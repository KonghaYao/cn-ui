import { debounce, throttle } from 'lodash-es'
import { Atom, atom } from './atom'
import { useEffectWithoutFirst } from './useEffect'

export function DebounceAtom<T>(a: Atom<T>, debounceTime: number = 150) {
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
export function ThrottleAtom<T>(a: Atom<T>, debounceTime: number = 150, options?: Parameters<typeof throttle>[2]) {
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
