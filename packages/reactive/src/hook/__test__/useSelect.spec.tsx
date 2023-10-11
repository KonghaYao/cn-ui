import { render, renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { usePagination } from '../usePagination';
import { genArray, sleep } from '../../utils';
import { useSelect } from '../useSelect';

test('单选方案', async () => {
    const {
        result: { activeIds, changeSelected, register, deregister, isSelected },
    } = renderHook(() => useSelect({ multi: false }));
    genArray(10).forEach((i) => {
        register(i.toString());
    });
    const select = (key: string) => {
        expect(isSelected(key)).toBe(false);
        changeSelected(key);
        expect(isSelected(key)).toBe(true);
    };
    const unselect = (key: string) => {
        expect(isSelected(key)).toBe(true);
        changeSelected(key);
        expect(isSelected(key)).toBe(false);
    };
    select('2');
    select('3');
    expect(isSelected('2')).toBe(false);
    unselect('3');
    expect(isSelected('3')).toBe(false);
});

test('多选方案', async () => {
    const {
        result: { activeIds, changeSelected, register, deregister, isSelected },
    } = renderHook(() => useSelect());
    genArray(10).forEach((i) => {
        register(i.toString());
    });
    const select = (key: string) => {
        expect(isSelected(key)).toBe(false);
        changeSelected(key);
        expect(isSelected(key)).toBe(true);
    };
    genArray(10).forEach((i) => {
        select(i.toString());
    });
    genArray(10).forEach((i) => {
        expect(isSelected(i.toString())).toBe(true);
    });
});
