import { render, renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { usePagination } from '../usePagination';
import { sleep } from '../../utils';
import { useSelect } from '../useSelect';

test('单选方案', async () => {
    const {
        result: { activeIds, changeSelected, register, deregister, isSelected },
    } = renderHook(() => useSelect());
});

test('多选方案', async () => {});
