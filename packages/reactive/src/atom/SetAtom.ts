import { differenceBy, intersectionBy, unionBy, xorBy } from 'lodash-es'
import { Atom, atom } from './atom'
import { proxyAtomFn } from '../utils/proxyAtomFn'

export type ValueIteratee<T> = Parameters<typeof differenceBy<T, T>>[2]
export interface SetAtomExtendType<T> {
    /**
     * 批量添加元素到集合中
     */
    addList(list: Set<T> | Array<T>): Set<T>

    /**
     * 从集合中批量删除元素
     */
    deleteList(list: Set<T> | Array<T>): Set<T>

    /**
     * 将集合转换为数组
     */
    toArray: () => Array<T>

    /**
     * 减去指定集合或数组后的集合
     */
    difference(setOrArray: Set<T> | Array<T>, by?: ValueIteratee<T>): Set<T>

    /**
     * 与指定集合或数组的交集集合
     */
    intersection(setOrArray: Set<T> | Array<T>, by?: ValueIteratee<T>): Set<T>

    /**
     * 与指定集合或数组的并集集合
     */
    union(setOrArray: Set<T> | Array<T>, by?: ValueIteratee<T>): Set<T>

    /**
     * 与指定集合或数组的异或集合
     */
    xor(setOrArray: Set<T> | Array<T>, by?: ValueIteratee<T>): Set<T>
}

export interface SetAtomType<T> extends Atom<Set<T>>, Pick<Set<T>, 'add' | 'clear' | 'delete'>, SetAtomExtendType<T> {}

/**
 * @zh 支持集合操作的 Atom 比原生 Set 更强
 * @en Support et operation of Atom more powerful than native Set
 */
export const SetAtom = <T>(initArray: T[]): SetAtomType<T> => {
    const set = atom(new Set(initArray), {
        equals: false
    })

    return Object.assign(set, proxyAtomFn(set, ['add', 'clear', 'delete']), {
        addList(list) {
            return set((i) => {
                list.forEach((item) => i.add(item))
                return i
            })
        },
        deleteList(list) {
            return set((i) => {
                list.forEach((item) => i.delete(item))
                return i
            })
        },
        toArray() {
            return [...set().values()]
        },
        difference(setOrArray, by) {
            return set((i) => new Set(differenceBy<T, T>([...i], [...setOrArray], by!)))
        },
        intersection(setOrArray, by) {
            return set((i) => new Set(intersectionBy<T, T>([...i], [...setOrArray], by!)))
        },
        union(setOrArray, by) {
            return set((i) => new Set(unionBy<T>([...i], [...setOrArray], by!)))
        },
        xor(setOrArray, by) {
            return set((i) => new Set(xorBy<T>([...i], [...setOrArray], by!)))
        }
    } as SetAtomExtendType<T>)
}
