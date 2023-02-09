import { renderHook } from '@solidjs/testing-library';
import { describe, expect, it, vi } from 'vitest';
import { useEffect, useEffectWithoutFirst, atom } from '../index';

describe('useEffect 测试', () => {
    it('useEffect', async () => {
        let cb = 0;
        let lastVal = 150;
        const {
            result: { source1, source, source2 },
        } = renderHook(() => {
            const source = atom(false);
            const source1 = atom(false);
            const source2 = atom(false);
            useEffect(
                (last) => {
                    source1(); // 测试是否被依赖收集
                    cb += 100;
                    lastVal = last + 100;

                    return lastVal;
                },
                [source, source2],
                lastVal
            );
            return { source1, source, source2 };
        });
        // 运行时被执行一次
        expect([cb, lastVal]).eql([100, 250]);

        // 触发 source1 不记录为依赖
        source1(true);
        expect([cb, lastVal]).eql([100, 250]);

        // 触发 source 指定为依赖
        [...Array(10).keys()].map((i) => {
            source((i) => !i);
            expect([cb, lastVal]).eql([200 + i * 100, 350 + i * 100]);
        });
    });
    it('useEffectWithoutFirst', async () => {
        let cb = 0;
        const {
            result: { source },
        } = renderHook(() => {
            const source = atom(false);
            useEffectWithoutFirst(() => {
                cb += 100;
            }, [source]);
            return { source };
        });
        // 第一次被忽略
        expect(cb).eq(0);

        // 触发 source 指定为依赖
        [...Array(10).keys()].map((i) => {
            source((i) => !i);
            expect(cb).eql(100 + i * 100);
        });
    });
});
