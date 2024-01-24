import { atom } from '../index'
import { renderHook } from '@solidjs/testing-library'
import { atomization } from '../../utils'
import { describe, expect, it } from 'vitest'
describe('原子化测试', () => {
    it('atom', () => {
        const { result: source } = renderHook(() => {
            return atom(false)
        })
        expect(source()).eq(false)
        expect(source((i) => !i)).eq(true)
        expect(source()).eq(true)
        expect(source(false)).eq(false)
        expect(source()).eq(false)
    })
    it('atom 值为 函数设置', () => {
        const noop = () => {}
        const noop1 = () => {}
        const { result: source } = renderHook(() => {
            return atom(noop)
        })
        expect(source()).eq(noop)
        /**@ts-ignore */
        expect(source(noop1)).eq(undefined) // 这是错误的用法，因为原子是函数，那么需要使用下面的方式强制赋值
        expect(source(() => noop1)).eq(noop1)
        expect(source()).eq(noop1)
    })
    it('atom.reflux', () => {
        const {
            result: { source, child }
        } = renderHook(() => {
            const source = atom(100)
            const child = source.reflux<string>(source().toString(), (val) => parseInt(val))
            return { child, source }
        })
        expect(child()).eq('100')
        expect(source()).eq(100)
        child('200')
        expect(source()).eq(200)
    })
    it('atomization', () => {
        const {
            result: { source }
        } = renderHook(() => {
            const source = atomization(100)
            return { source }
        })
        expect(source()).eq(100)
    })
})
