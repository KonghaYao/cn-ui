import { render, renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { usePaginationStack } from '../usePagination';
import { sleep } from '../../utils';

test('无限加载-常用方式', async () => {
    const req = vi.fn();
    const {
        result: { goto, resetStack, prev, next, dataSlices, currentPage, maxPage, waitForDone },
    } = renderHook(() =>
        usePaginationStack(
            async (index) => {
                req();
                return sleep(100, index);
            },
            {
                tap() {
                    maxPage(100);
                },
                debounceTime: 10,
            }
        )
    );
    // 左侧越界，取消加载
    prev();
    prev();
    prev();
    await waitForDone();
    expect(dataSlices().length).eql(1);
    expect(currentPage()).eq(1);
    expect(req).toBeCalledTimes(1);

    // 模拟无限下一次
    next();
    await waitForDone();
    next();
    await waitForDone();
    next();
    await waitForDone();
    expect(maxPage()).eq(100);
    expect(currentPage()).eq(4);
    expect(dataSlices().length).eql(4);
    expect(dataSlices()).eql([0, 1, 2, 3]);
    expect(req).toBeCalledTimes(4);

    resetStack();
    expect(dataSlices()).eql([]);
    expect(currentPage()).eql(1);
    await waitForDone();
    expect(dataSlices()).eql([0]);
});
