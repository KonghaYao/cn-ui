import { renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { asyncLock } from '../asyncLock';
import { sleep } from '../sleep';

test('asyncLock', () => {
    const once = vi.fn();
    const asyncRuntime = () => {
        once();
        return sleep(1000);
    };
    const wrappedFunc = asyncLock(asyncRuntime);
    const res = [
        wrappedFunc(),
        // 下面这些调用均不会发出
        wrappedFunc(),
        wrappedFunc(),
        wrappedFunc(),
        wrappedFunc(),
    ];
    expect(once).toBeCalledTimes(1);
    expect(res).eql(Array(5).fill(res[0])); // 全部都是同一个 Promise 的引用
});
