import { render, renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { usePagination } from '../usePagination';
import { sleep } from '../../utils';

test('常用页面方式', async () => {
    const req = vi.fn();
    const {
        result: { goto, prev, next, currentData, currentPage, maxPage, waitForDone },
    } = renderHook(() =>
        usePagination(
            async (index) => {
                req();
                return sleep(1000, index);
            },
            {
                onSuccess() {
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
    expect(currentData()).eql(0);
    expect(currentPage()).eq(1);
    expect(req).toBeCalledTimes(1);

    next();
    next();
    next();
    await waitForDone();
    expect(maxPage()).eq(100);
    expect(currentPage()).eq(4);
    expect(currentData()).eql(3);
    expect(req).toBeCalledTimes(2);

    goto(99);
    await waitForDone();
    expect(currentData.isReady()).toBe(true);
    expect(currentData()).eql(99);
    expect(next()).eql(false);
});

test('携带初始赋值', async () => {
    const req = vi.fn();
    const {
        result: { goto, prev, next, currentData, currentPage, maxPage, waitForDone },
    } = renderHook(() =>
        usePagination(
            async (index) => {
                req();
                return sleep(1000, index);
            },
            {
                initIndex: 5,
                immediately: false,
                onSuccess() {
                    maxPage(100);
                },
                debounceTime: 30,
            }
        )
    );
    // 左侧越界，取消加载
    prev();
    prev();
    prev();
    await waitForDone();
    expect(currentData()).eql(2);
    expect(currentPage()).eq(3);
    expect(req).toBeCalledTimes(1);
});
