import { createSignal, Accessor, createEffect, untrack } from 'solid-js';
export type Atom<T> = (<U extends T>(value: (prev: T) => U) => U) &
    (<U extends T>(value: Exclude<U, Function>) => U) &
    (<U extends T>(value: Exclude<U, Function> | ((prev: T) => U)) => U) &
    Accessor<T>;

type SignalOptions = Parameters<typeof createSignal>[1];

/**
 * @category atom
 * @zh 加强版的 atom
 * @en very easy way to use reactive value!
 * @example
 *  const a = atom(false);
 *  // get data
 *  console.log(a());
 *
 *  // change data
 *  a(true);
 *  a(i=>!i);
 *
 *
 * @description atom 的理念来自 solid-use, 使用一个函数进行响应式数据的管理
 */
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

/**
 * @category atom
 * @zh 通过类似 createMemo 的方式创建 atom
 * @en create an atom like createMemo
 * @example
 * const A = atom(true)
 * const newAtom = reflect(()=>a()?"infoA":"infoB")
 *
 * A(true) // when A changed newAtom will synchronous update
 *
 * // 自定义初始值
 * const b = reflect(()=>a(),false,'I am a string')
 * b() // 'I am a string'
 *
 * b('Hi, I am a hack'); // casually changed the value,
 * // It will updated the lower course of source without change the source
 *
 */
export const reflect = <T>(memoFunc: () => T, immediately = true, initValue?: T) => {
    const a = atom<T>(immediately ? untrack(memoFunc) : initValue);
    createEffect(() => {
        /** @ts-ignore */
        a(memoFunc());
    });
    return a;
};

/**
 * @category atom
 * @zh 将 props 中的静态属性或者是 atom 统一为 atom
 * @en transform value of props to an atom
 * @example
 * const Comp = (props)=>{
 *    // props.value could be string or an atom
 *    const value = atomization(props.value)
 *    // after, value is an atom
 *    return <div></div>
 * }
 */
export const atomization = <T>(prop: T | Atom<T>): Atom<T> => {
    /**@ts-ignore */
    return typeof prop === 'function' ? prop : atom(prop);
};
