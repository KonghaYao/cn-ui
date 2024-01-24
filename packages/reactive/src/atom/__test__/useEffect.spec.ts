import { renderHook } from '@solidjs/testing-library'
import { describe, expect, it, vi } from 'vitest'
import { useEffect, useEffectWithoutFirst, atom } from '../index'
import { createEffect } from 'solid-js'

describe('useEffect 测试', () => {
    it('useEffect', async () => {
        let cb = 0
        let lastVal = 150
        const {
            result: { source1, source, source2 }
        } = renderHook(() => {
            const source = atom(false)
            const source1 = atom(false)
            const source2 = atom(false)
            useEffect(
                (last) => {
                    source1() // 测试是否被依赖收集
                    cb += 100
                    lastVal = last + 100

                    return lastVal
                },
                [source, source2],
                lastVal
            )
            return { source1, source, source2 }
        })
        // 运行时被执行一次
        expect([cb, lastVal]).eql([100, 250])

        // 触发 source1 不记录为依赖
        source1(true)
        expect([cb, lastVal]).eql([100, 250])

        // 触发 source 指定为依赖
        ;[...Array(10).keys()].map((i) => {
            source((i) => !i)
            expect([cb, lastVal]).eql([200 + i * 100, 350 + i * 100])
        })
    })
    it('useEffectWithoutFirst', async () => {
        let cb = 0
        const {
            result: { source }
        } = renderHook(() => {
            const source = atom(false)
            useEffectWithoutFirst(() => {
                cb += 100
            }, [source])
            return { source }
        })
        // 第一次被忽略
        expect(cb).eq(0)

        // 触发 source 指定为依赖
        ;[...Array(10).keys()].map((i) => {
            source((i) => !i)
            expect(cb).eql(100 + i * 100)
        })
    })
    it('createEffect 测试', async () => {
        const dep = vi.fn()
        const {
            result: { a, b, magic }
        } = renderHook(() => {
            const a = atom('a')
            const b = atom('b')
            const magic = atom(true)

            createEffect(() => {
                dep()
                if (magic()) {
                    a()
                } else {
                    // 第一次这里不会被触发，所以其实是没有收集到 b 的依赖的
                    b()
                }
            })
            return { a, b, magic }
        })
        expect(dep).toBeCalledTimes(1)
        b('c') // 更改 b 不会触发依赖更新
        expect(dep).toBeCalledTimes(1)

        magic(false) // 使得分支运行到 false 状态，触发 b 的依赖
        expect(dep).toBeCalledTimes(2)

        b('b') // 这次就触发了 effect
        expect(dep).toBeCalledTimes(3)
    })
})
