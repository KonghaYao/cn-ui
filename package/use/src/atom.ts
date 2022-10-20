import { createSignal, Accessor, createEffect, untrack } from 'solid-js';
import { createIgnoreFirst } from './createIgnoreHead';
export interface Atom<T> extends Accessor<T> {
    <U extends T>(value: (prev: T) => U): U;
    <U extends T>(value: Exclude<U, Function>): U;
    <U extends T>(value: Exclude<U, Function> | ((prev: T) => U)): U;
    reflux<C>(this: Atom<T>, init: C, computed: (inputValue: C) => T): Atom<C>;
}

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

    return Object.assign(
        (...args: [] | [T]) => {
            if (args.length === 0) {
                return state();
            }
            /** @ts-ignore */
            setState(...args);
        },
        { reflux }
    ) as Atom<T>;
};
/**
 * @zh 生成回流 atom， 回流 atom 的数值改变将会返回改变原始的 atom
 * @description 不同于 reflect 的衍生，回流是主动改变上流的原子
 * @example
 *
 * const a = atom(0)
 *
 *  const b = a.reflux('0',(newValue)=>parseInt(newValue))
 *
 *  <div onClick={
 *      ()=>{
 *          b('1000') // `a` will be switch to number 1000
 *      }
 *  }></div>
 *
 *
 */
const reflux: Atom<unknown>['reflux'] = function (init, computed) {
    const a = atom(init);
    createIgnoreFirst(() => {
        this(() => computed(a()));
    }, [a]);
    return a;
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
    // createEffect 会经过 solid 的生命周期，在这之前，是没有值的
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

/**
 * @category atom
 * @zh 将响应式数组转化为单个响应式对象组成的数组
 * @en transform reactive array to an normal array includes reactive items
 * @example
 * const list atom([1,2,3])
 *
 * const [atom1,atom2,atom3] =  AtomToArray(list)
 */
export const AtomToArray = <T>(atom: Atom<T[]>) => {
    return atom().map((_, index) => {
        return reflect(() => atom()[index]);
    });
};
