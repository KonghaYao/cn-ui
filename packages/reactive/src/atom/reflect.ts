import { createEffect, createMemo, untrack } from 'solid-js'
import { Atom, AtomTypeSymbol, atom } from './atom'

export interface ReflectOptions<T> {
    immediately?: boolean
    initValue?: T
    step?: boolean
}

interface ComputedAtom<T> extends Atom<T> {
    recomputed(): void
}
/**
 * @category atom
 * @zh 通过类似 createMemo 的方式创建 atom
 * @en create an atom like createMemo
 * @example
 * const A = atom(true)
 * const newAtom = reflect(()=>a()?"infoA":"infoB")
 *
 * A(false)
 *
 * newAtom() //'infoB' | when A changed newAtom will synchronous update
 *
 *
 * const b = reflect(()=> a(), {
 *     immediately :false,
 *     initValue:'I am a string'
 * })// you can input what you want instead the computed value
 * b() // 'I am a string'
 *
 * b('Hi, I am a hack'); // you can change the atom this time, but next time it will computed from source
 *
 * @design reflect 是为了衍生 Atom，同时具有读写权限。但是不能复用 atom ，atom 中传入函数是把函数当做初始值。 Memo 是只读的，这是它们的区别。
 */
export const reflect = <T>(
    /** 衍生函数 */
    memoFunc: (lastValue: T) => T,
    {
        /** 是否立刻求值 (是否忽略第一次求值) */
        immediately = true,
        /** 如果不进行求值，那么将会之用初始值进行替代 */
        /** @ts-ignore */
        initValue = null,
        /** 是否手动进行依赖触发 */
        step = false
    }: ReflectOptions<T> = {}
) => {
    const a = atom<T>(immediately ? untrack(() => memoFunc(initValue)) : initValue)
    // createEffect 会经过 solid 的生命周期，在这之前，是没有值的
    !step && createEffect((lastValue: T) => {
        return a(() => memoFunc(lastValue))
    }, initValue)
    a[AtomTypeSymbol] = 'reflect'
    return Object.assign(a, {
        recomputed() {
            return a((val) => memoFunc(val))
        }
    }) as ComputedAtom<T>
}
export const computed = reflect
/**
 * @zh Memo 形式的映射，注意，其为只读特性
 */
export const reflectMemo = <T>(
    /** 衍生函数 */
    memoFunc: (lastValue: T) => T,
    {
        /** 是否立刻求值 (是否忽略第一次求值) */
        immediately = true,
        /** 如果不进行求值，那么将会之用初始值进行替代 */
        /** @ts-ignore */
        initValue = null
    }: ReflectOptions<T> = {}
) => {
    // Memo 与 Effect 不一样，Memo 是立即求值，而 reflect 则在生命周期之后求值
    return createMemo<T>((lastValue) => {
        const val = memoFunc(lastValue)
        if (immediately) {
            return val
        } else {
            immediately = true
            return initValue
        }
    }, initValue)
}
