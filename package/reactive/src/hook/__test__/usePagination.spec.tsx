import { render, renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { createBlackBoard } from '../blackboard';
import { ObjectAtom } from '../../atom/ObjectAtom';
import { onMount } from 'solid-js';
import { usePagination } from '../usePagination';
import { sleep } from '../../utils';

test('常用页面方式', async () => {
    const req = vi.fn();
    const {
        result: { goto, prev, next, currentData, currentPage, maxPage, waitForDone },
    } = renderHook(() =>
        usePagination(
            async (page) => {
                req();
                return sleep(1000, page);
            },
            {
                refetch: { warn: false },
                tap() {
                    maxPage(100);
                },
            }
        )
    );
    prev();
    prev();
    prev();
    await waitForDone();
    expect(currentPage()).eq(1);
    expect(req).toBeCalledTimes(1);

    next();
    next();
    next();
    await waitForDone();
    expect(maxPage()).eq(100);
    expect(currentPage()).eq(4);
    expect(req).toBeCalledTimes(2);
});
