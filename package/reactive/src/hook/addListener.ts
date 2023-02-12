import { onCleanup, onMount } from 'solid-js';

/**
 * 当你需要向 window 等外部的变量进行监听事件时，请使用这个函数
 * 这个函数将会自动绑定并自动清除
 *  */
export const addListener = <T, D extends (...args: any) => any>(
    dom: T,
    name: Parameters<D>[0],
    event: Parameters<D>[1],
    {
        /** @ts-ignore */
        on = (dom: HTMLElement) => dom.addEventListener,
        /** @ts-ignore */
        off = (dom: HTMLElement) => dom.removeEventListener,
    }: {
        on?: (dom: T) => D;
        off?: (dom: T) => D;
    } = {}
) => {
    on(dom).call(dom, name, event);
    onCleanup(() => {
        off(dom).call(dom, name, event);
    });
};
