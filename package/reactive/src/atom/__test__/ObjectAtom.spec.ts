import { test } from 'vitest';
import { ObjectAtom } from '../ObjectAtom';
import { renderHook } from '@solidjs/testing-library';

test('form', () => {
    const {
        result: { fd, username, password },
    } = renderHook(() => {
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
