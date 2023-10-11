import { expect, test } from 'vitest';
import { ObjectAtom } from '../ObjectAtom';
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
test('ObjectAtom 输入为 Atom', () => {
    const {
        result: { fd, username, password },
    } = renderHook(() => {
        // 通过申请对象 Atom 将数据键转变为 Atom
        const fd = ObjectAtom(
            atom({
                username: '江夏尧',
                password: '124567890',
            })
        );
        return { fd, username: fd.username, password: fd.password };
    });
    username('abcd');
    expect(fd().username).eql('abcd');
    // expect(fd().username).eql('江夏哟啊');
    password('11526392');
    expect(fd().password).eql('11526392');
});
