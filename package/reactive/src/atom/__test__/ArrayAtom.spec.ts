import { renderHook } from '@solidjs/testing-library';
import { test } from 'vitest';
import { ArrayAtom } from '../ArrayAtom';
const _arr = [...Array(10).keys()];
test('ArrayAtom number test', () => {
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr);
    });
    expect(arr()).eq(_arr);

    arr.replace(6, 10);
    expect(arr()[6]).eq(10);

    arr.insertAfter(10, 999);
    expect(arr()[7]).eq(999);
    expect(arr().length).eq(11);

    arr.insertBefore(10, 888);
    expect(arr()[6]).eq(888);
    expect(arr().length).eq(12);

    arr.remove(888);
    arr.remove(999);
    arr.replace(10, 6);
    expect(arr()).eql(_arr);
});
test('ArrayAtom Object test', () => {
    const originArr = _arr.map((i) => ({ id: i, key: i.toString() }));
    const target = originArr[6];
    const { result: arr } = renderHook(() => {
        return ArrayAtom(originArr);
    });
    expect(arr()).eq(originArr);

    const temp = { id: 10, key: '10' };
    arr.replace(target, temp);
    expect(arr()[6]).eq(temp);

    arr.insertAfter(temp, target);
    arr.insertBefore(temp, target);
    expect(arr()[6]).eq(arr()[8]);
    expect(arr().length).eq(12);

    arr.removeAll(target);
    arr.remove(temp);
    arr.insertAfter(arr()[5], target);
    expect(arr()).eql(originArr);
});
test('ArrayAtom Object bulk test', () => {
    const { result: arr } = renderHook(() => {
        return ArrayAtom(_arr);
    });
    arr.replace(0, 6);
    expect(arr()[0]).eq(6);

    arr.replaceAll(6, 100);
    expect(arr()[0]).eq(arr()[6]).eql(100);

    arr.removeAll(100);
    expect(arr().some((i) => i === 10)).eq(false);
});
