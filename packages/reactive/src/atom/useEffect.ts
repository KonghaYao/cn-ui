import { Accessor, createEffect, on } from 'solid-js'
import type { EffectFunction } from 'solid-js'

/**
 * @zh 忽略首次执行的 Effect, 但是你需要手动声明依赖
 * @en createEffect But ignore the first time, like react you need to declare deps

 *  */
export const useEffectWithoutFirst = <T>(
    func: EffectFunction<T, T>,
    deps: Accessor<unknown>[],
    /** @ts-ignore */
    initVal?: T = null
) => {
    let head = true
    return useEffect<T>(
        (lastVal: T) => {
            if (head) {
                head = false
                return null as T
            } else {
                return func(lastVal) as T
            }
        },
        deps,
        initVal
    )
}
/**
 *
 * @deprecated useEffectWithoutFirst instead
 */
export const createIgnoreFirst = useEffectWithoutFirst

/**
 * @zh 类似 react 的 useEffect 模式，从 deps 中收集依赖，而不是在函数内自动收集
 *  */
export const useEffect = <T>(
    func: EffectFunction<T, T>,
    deps: Accessor<unknown>[],
    /** @ts-ignore */
    initVal?: T = null
) => {
    let val = initVal
    return createEffect<T>(
        on(deps, () => {
            val = func(val)
            return val
        })
    )
}
