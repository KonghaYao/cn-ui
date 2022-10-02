import { createSignal, Setter, Accessor, createMemo, createEffect } from 'solid-js';
export type Atom<T> = (<U extends T>(value: (prev: T) => U) => U) &
    (<U extends T>(value: Exclude<U, Function>) => U) &
    (<U extends T>(value: Exclude<U, Function> | ((prev: T) => U)) => U) &
    Accessor<T>;

type SignalOptions = Parameters<typeof createSignal>[1];

/** @zh 加强版的 atom */
export const atom = <T>(value: T, props?: SignalOptions): Atom<T> => {
    const [state, setState] = createSignal<T>(value, props);
    return ((...args: [] | [T]) => {
        if (args.length === 0) {
            return state();
        }
        /** @ts-ignore */
        setState(...args);
    }) as Atom<T>;
};

/** 通过一个 Memo 函数创建 atom */
export const reflect = <T>(memoFunc: () => T) => {
    const a = atom<T>(false as T);
    createEffect(() => {
        /** @ts-ignore */
        a(memoFunc());
    });
    return a;
};

/** @zh 将prop 中的静态属性或者是 atom 统一为 atom */
export const atomization = <T>(prop: T | Atom<T>): Atom<T> => {
    /**@ts-ignore */
    return typeof prop === 'function' ? prop : atom(prop);
};
