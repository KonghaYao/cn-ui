import { createSignal, Setter, Accessor } from 'solid-js';
export type Atom<T> = Setter<T> & Accessor<T>;

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
