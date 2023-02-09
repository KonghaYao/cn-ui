import { Accessor, createEffect, lazy, untrack, on } from 'solid-js';
import { EffectFunction } from 'solid-js/types/reactive/signal';

/**
 * @zh 忽略首次执行的 Effect, 但是你需要手动声明依赖
 * @en createEffect But ignore the first time, like react you need to declare deps

 *  */
export const useEffectWithoutFirst = <T>(
    func: EffectFunction<T, T>,
    deps: Accessor<unknown>[],
    initVal?: T
) => {
    let head = true;
    return useEffect<T>(
        (lastVal) => {
            if (head) {
                head = false;
            } else {
                return func(lastVal);
            }
        },
        deps,
        initVal
    );
};
/**
 *
 * @deprecated useEffectWithoutFirst instead
 */
export const createIgnoreFirst = useEffectWithoutFirst;

/**
 * @zh 类似 react 的 useEffect 模式，从 deps 中收集依赖，而不是在函数内自动收集
 *  */
export const useEffect = <T>(
    func: EffectFunction<T, T>,
    deps: Accessor<unknown>[],
    initVal?: T
) => {
    let val = initVal;
    return createEffect<T>(
        on(deps, () => {
            val = func(val);
            return val;
        })
    );
};
