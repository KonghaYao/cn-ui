import { renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { addListener } from '../addListener';
import mitt, { Emitter } from 'mitt';
test('addListener DOM', () => {
    const noop = vi.fn();

    // mock Element's way
    const center = mitt<{
        onload: undefined;
    }>();
    /** @ts-ignore  */
    center.addEventListener = center.on;
    /** @ts-ignore  */
    center.removeEventListener = center.off;

    const { cleanup } = renderHook(() => {
        addListener(center, 'onload', noop);
        center.emit('onload');
    });
    cleanup();
    center.emit('onload');
    center.emit('onload');
    center.emit('onload');
    center.emit('onload');
    center.emit('onload');

    expect(noop).toBeCalledTimes(1);
});
test('addListener FrameWork', () => {
    const noop = vi.fn();
    const center = mitt<{
        onload: undefined;
    }>();
    const { cleanup } = renderHook(() => {
        const handle = { on: (i: any) => i.on, off: (i: any) => i.off };
        addListener(window, 'onload', noop);
        addListener(center, 'onload', noop, handle);
        center.emit('onload');
    });
    cleanup();
    // 这一次 emit 将会被忽略
    center.emit('onload');
    expect(noop).toBeCalledTimes(1);
});
