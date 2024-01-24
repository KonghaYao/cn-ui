import { renderHook } from '@solidjs/testing-library'
import { expect, test } from 'vitest'
import { ArrayAtom } from '../ArrayAtom'
import { atom } from '../atom'
import { genArray } from '../../utils'
test('ArrayAtom number test', () => {
    const _arr = genArray(10)
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr)
    })
    expect(arr()).eq(_arr)

    arr.replace(6, 10)
    expect(arr()[6]).eq(10)

    arr.insert(999, 10, 'after')
    expect(arr()[7]).eq(999)
    expect(arr().length).eq(11)

    arr.insert(888, 10)
    expect(arr()[6]).eq(888)
    expect(arr().length).eq(12)

    arr.remove(888)
    arr.remove(999)
    arr.replace(10, 6)
    expect(arr()).eql(_arr)
})
test('ArrayAtom Object test', () => {
    const _arr = genArray(10)
    const originArr = _arr.map((i) => ({ id: i, key: i.toString() }))
    const target = originArr[6]
    const { result: arr } = renderHook(() => {
        return ArrayAtom(originArr)
    })
    expect(arr()).eq(originArr)

    const temp = { id: 10, key: '10' }
    arr.replace(target, temp)
    expect(arr()[6]).eq(temp)

    arr.insert(target, temp, 'after')
    arr.insert(target, temp)
    expect(arr()[6]).eq(arr()[8])
    expect(arr().length).eq(12)

    arr.removeAll(target)
    arr.remove(temp)
    arr.insert(target, arr()[5], 'after')
    expect(arr()).eql(originArr)
})
test('ArrayAtom Object bulk test', () => {
    const _arr = genArray(10)
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr)
    })
    arr.replace(0, 6)
    expect(arr()[0]).eq(6)

    arr.replaceAll(6, 100)
    expect(arr()[0]).eq(arr()[6]).eql(100)

    arr.removeAll(100)
    expect(arr().some((i) => i === 10)).eq(false)
})
test('ArrayAtom: move 测试', () => {
    const _arr = genArray(10)
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr)
    })
    arr.move(3, 6)
    expect(arr()[6]).eql(6)
    expect(arr()[5]).eql(3)
    arr.move(3, 2, 'after')
    expect(arr()).eql(_arr)
})
test('ArrayAtom: switch 测试', () => {
    const _arr = genArray(10)
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr)
    })
    arr.switch(3, 6)
    expect(arr()[6]).eql(3)
    expect(arr()[3]).eql(6)
})
test('ArrayAtom 输入为 Atom 设计', () => {
    const _arr = genArray(10)
    const { result: arr } = renderHook(() => {
        const arr = atom(_arr)
        return ArrayAtom(arr)
    })
    arr.replace(0, 6)
    expect(arr()[0]).eq(6)

    arr.replaceAll(6, 100)
    expect(arr()[0]).eq(arr()[6]).eql(100)

    arr.removeAll(100)
    expect(arr().some((i) => i === 10)).eq(false)
})
