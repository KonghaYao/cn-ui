import type { SignalOptions } from 'solid-js'
import { Atom, AtomTypeSymbol, atom } from './atom'
import type { InferArray } from '../typeUtils'
import { isAtom } from '../utils'

export interface ArrayAtomExtends<T> {
    replace(oldItem: T, newItem: T): this
    replaceAll(oldItem: T, newItem: T): this
    remove(item: T): this
    removeAll(item: T): this
    insert(positionItem: T, newItem: T, position?: 'before' | 'after'): this
    move(thisItem: T, nearByItem: T, position?: 'before' | 'after'): this
    switch(thisItem: T, nearByItem: T): this
}
export interface ArrayAtomType<Arr extends any[]> extends Atom<Arr>, ArrayAtomExtends<InferArray<Arr>> {}

/**
 * @zh 更加简单操作数组 Atom 对象
 */
function ArrayAtom<Arr extends any[], T = InferArray<Arr>>(init: Atom<Arr>): ArrayAtomType<Arr>
function ArrayAtom<Arr extends any[], T = InferArray<Arr>>(init: Arr, options?: SignalOptions<Arr>): ArrayAtomType<Arr>
function ArrayAtom<Arr extends any[], T = InferArray<Arr>>(init: Arr | Atom<Arr>, options?: SignalOptions<Arr>): ArrayAtomType<Arr> {
    const arr = isAtom(init) ? (init as Atom<Arr>) : atom(init as Arr, options)
    /** 指向第一个匹配到的对象 */
    const cursorItem = <Inner>(i: Inner[], oldItem: Inner, func: (arr: Inner[], index: number) => void) => {
        const index = i.findIndex((ii) => ii === oldItem)
        if (index >= 0) {
            const newArr = [...i]
            func(newArr, index)
            return newArr
        } else {
            console.warn("Can't find array atom Item: ", oldItem)
            return i
        }
    }
    const arrM: ArrayAtomExtends<T> = {
        /** 替换一个数组位置 */
        replace(oldItem, newItem) {
            arr((i) => {
                return cursorItem<T>(i, oldItem, (arr, index) => {
                    arr[index] = newItem
                }) as Arr
            })
            return this
        },
        /** 替换所有的数组位置 */
        replaceAll(oldItem, newItem) {
            arr((i) => {
                const indexArray: number[] = []
                i.forEach((ii, index) => ii === oldItem && indexArray.push(index))
                const newArr = [...i]
                indexArray.forEach((index) => (newArr[index] = newItem))
                return newArr as Arr
            })
            return this
        },
        /** 根据该元素删除数组中的所有这个元素 */
        remove(item) {
            arr((i) => {
                return cursorItem<T>(i, item, (arr, index) => {
                    arr.splice(index, 1)
                }) as Arr
            })
            return this
        },
        removeAll(item) {
            arr((i) => {
                return i.filter((ii) => ii !== item) as Arr
            })
            return this
        },
        insert(newItem, positionItem, position = 'before') {
            arr((i) => {
                return cursorItem<T>(i, positionItem, (arr, index) => {
                    arr.splice(position === 'before' ? index : index + 1, 0, newItem)
                }) as Arr
            })
            return this
        },
        move(thisItem, nearByItem, position) {
            this.remove(thisItem)
            this.insert(thisItem, nearByItem, position)
            return this
        },
        switch(thisItem, nearByItem) {
            arr((oldArr) => {
                const newA = [...oldArr]
                const index1 = arr().findIndex((i) => i === thisItem)
                const index2 = arr().findIndex((i) => i === nearByItem)
                if (index1 === -1 || index2 === -1) throw new Error('ArrayAtom: Please check the Items you want to switch ')
                newA[index1] = nearByItem
                newA[index2] = thisItem
                return newA as Arr
            })

            return this
        }
    }
    /** @ts-ignore */
    return Object.assign(arr, { ...arrM, [AtomTypeSymbol]: 'array' })
    // return { ...arr,  ...arrM, [AtomTypeSymbol]: 'array'};
}
export { ArrayAtom }
