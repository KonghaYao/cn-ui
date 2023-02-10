import { renderHook } from '@solidjs/testing-library';
import { test, vi } from 'vitest';
import { addListener } from '../addListener';
import mitt from 'mitt';
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
        const handle = { on: (i) => i.on, off: (i) => i.off };
        addListener(center, 'onload', () => noop(), handle);
        center.emit('onload');
    });
    cleanup();
    center.emit('onload');
    expect(noop).toBeCalledTimes(1);
});
