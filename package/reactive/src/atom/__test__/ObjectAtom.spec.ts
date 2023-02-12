import { test } from 'vitest';
import { ObjectAtom } from '../ObjectAtom';
import { EntriesTransform } from '../EntriesTransform';
import { renderHook } from '@solidjs/testing-library';
import { atom } from '../atom';

test('ObjectAtom', () => {
    const {
        result: { fd, username, password },
    } = renderHook(() => {
        // 通过申请对象 Atom 将数据键转变为 Atom
        const fd = ObjectAtom({
            username: '江夏尧',
            password: '124567890',
        });
        return { fd, username: fd.username, password: fd.password };
    });
    username('abcd');
    expect(fd().username).eql('abcd');
    // expect(fd().username).eql('江夏哟啊');
    password('11526392');
    expect(fd().password).eql('11526392');
});
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
