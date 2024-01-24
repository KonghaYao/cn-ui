import { ArrayAtom, atom, reflect, reflectMemo } from '../index'
import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it } from 'vitest'

describe('Reflect 测试', () => {
    it('reflectMemo', async () => {
        const {
            result: { other, source }
        } = renderHook(() => {
            const source = atom(false)
            const other = reflectMemo(() => (source() ? 100 : -100))
            return { source, other }
        })
        // 检测初步响应式
        expect(other()).eq(-100)
        source(true)
        expect(source()).eq(true)

        expect(other()).eq(100)
    })
    it('reflect', async () => {
        const {
            result: { source, other }
        } = renderHook(() => {
            const source = atom(false)

            const other = reflect(() => (source() ? 100 : -100))
            return { source, other }
        })
        // 检测初步响应式
        expect(other()).eq(-100)
        source(true)
        expect(other()).eq(100)

        // @ts-ignore 数值突变
        other('123')
        expect(other()).eq('123')
    })
})
