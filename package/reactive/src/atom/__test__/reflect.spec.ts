import { ArrayAtom, atom, reflect, reflectMemo } from '../index';
import { renderHook } from '@solidjs/testing-library';
import { describe, expect, it } from 'vitest';

describe('Reflect 测试', () => {
    it('reflectMemo', async () => {
        const {
            result: { other, source },
        } = renderHook(() => {
            const source = atom(false);
            const other = reflectMemo(() => (source() ? 100 : -100));
            return { source, other };
        });
        // 检测初步响应式
        expect(other()).eq(-100);
        source(true);
        expect(source()).eq(true);

        expect(other()).eq(100);
    });
    it('reflect', async () => {
        const {
            result: { source, other },
        } = renderHook(() => {
            const source = atom(false);

            const other = reflect(() => (source() ? 100 : -100));
            return { source, other };
        });
        // 检测初步响应式
        expect(other()).eq(-100);
        source(true);
        expect(other()).eq(100);

        // @ts-ignore 数值突变
        other('123');
        expect(other()).eq('123');
    });
    it('reflect with default value', async () => {
        const {
            result: { other },
        } = renderHook(() => {
            const source = atom(false);

            const other = reflect(() => (source() ? 100 : -100), {
                immediately: false,
                initValue: 800,
            });
            // 因为 createEffect 内部实现算是宏任务，所以在这个上下文中，初始化函数被自定义值给替换了，所以第一次渲染是 800 而不是计算量
            expect(other()).eq(800);
            return { source, other };
        });

        expect(other()).eq(-100);
    });
});
