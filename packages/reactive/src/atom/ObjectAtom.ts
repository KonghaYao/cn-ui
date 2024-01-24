import type { SignalOptions } from 'solid-js'
import { Atom, AtomTypeSymbol, atom } from './atom'
import { isAtom } from '../utils'

export type ObjectAtomType<T> = {
    [key in keyof T]: Atom<T[key]>
} & Atom<T>

/**
 * @zh 将键值对进行 key 分离，所有的 keyAtom 将会回流向原始 Atom ，所以并不是简单的生成关系
 *
 * @example
 * const form = ObjectAtom({
 *     username: '江夏尧',
 *     password: '124567890',
 * })
 *
 * form.username()
 * form.password()
 *
 * const submit = ()=>{
 *     const result = form()
 * }
 */

function ObjectAtom<T extends Record<string, unknown>>(obj: Atom<T>): ObjectAtomType<T>
function ObjectAtom<T extends Record<string, unknown>>(obj: T, options?: Omit<SignalOptions<T>, 'equals'>): ObjectAtomType<T>
function ObjectAtom<T extends Record<string, unknown>>(obj: T | Atom<T>): ObjectAtomType<T> {
    const hugeAtom = isAtom(obj) ? (obj as Atom<T>) : atom(obj as T, { equals: false })
    const inner = isAtom(obj) ? (obj as Atom<T>)() : (obj as T)
    hugeAtom[AtomTypeSymbol] = 'object'
    const splitStore = new Map()
    const keyStore = new Set([AtomTypeSymbol, ...Object.keys(inner)])
    return new Proxy(hugeAtom, {
        get(target, key: string) {
            if (!keyStore.has(key)) throw new Error(`key: ${key} can't be found in formObject!`)
            if (splitStore.has(key)) {
                return splitStore.get(key)
            } else {
                const newAtom = target.reflux(target()[key], (input) => {
                    // 注意，这里需要即时计算
                    ;(target() as any)[key] = input
                    return target()
                })
                splitStore.set(key, newAtom)
                return newAtom
            }
        },
        apply(target, thisArg, argArray) {
            return Reflect.apply(target, thisArg, argArray)
        }
    }) as ObjectAtomType<T>
}
export { ObjectAtom }
