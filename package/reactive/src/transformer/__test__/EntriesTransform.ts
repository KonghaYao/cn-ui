import { test } from 'vitest';
import { ObjectAtom } from '../../atom/ObjectAtom';
import { EntriesTransform } from '../EntriesTransform';
import { renderHook } from '@solidjs/testing-library';
import { atom } from '../../atom/atom';

test('EntriesTransform', () => {
    const input = {
        username: '江夏尧',
        password: '124567890',
    };
    const {
        result: { fd },
    } = renderHook(() => {
        // 通过申请对象 Atom 将数据键转变为 Atom
        const fd = ObjectAtom(input);
        return { fd };
    });
    expect([...EntriesTransform(fd).toFromData().entries()]).eql(Object.entries(input));
    expect(EntriesTransform(fd).toEntries()).eql(Object.entries(input));
    expect([...EntriesTransform(fd).toMap<Map<string, string>>().entries()]).eql(
        Object.entries(input)
    );
    expect(EntriesTransform(fd).toEntries()).eql(Object.entries(input));
    /** Headers 会有 Header 的参数校验 */
    const header = { 'content-type': 'application/json', 'cache-control': 'no-store' };
    expect([...EntriesTransform(atom(header)).toHeaders().entries()]).eql(
        Object.entries(header).reverse()
    );
    expect(EntriesTransform(fd).toJSON()).eql(JSON.stringify(input));
});
