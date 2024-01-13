import { createSignal, Accessor, Setter } from 'solid-js';
import { useEffectWithoutFirst } from './useEffect';

export const AtomTypeSymbol = Symbol('AtomTypeSymbol');
/** 获取 Atom 的种类 */
export const getAtomType = (a: Atom<unknown>) => a[AtomTypeSymbol];

export interface PartialSetter<T> {
    <U extends T>(value: (prev: T) => U): U;
    <U extends T>(value: Exclude<U, Function>): U;
    <U extends T>(value: Exclude<U, Function> | ((prev: T) => U)): U;
}

export interface Atom<T> extends Accessor<T>, PartialSetter<T> {
    reflux: makeReflux<T>;
    toSignal(): [Accessor<T>, Setter<T>];
    getGetter(): Accessor<T>;
    getSetter(): Setter<T>;
    [AtomTypeSymbol]: string;
}
type SignalOptions<T> = { equals?: false | ((prev: T, next: T) => boolean) };

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
export const atom = <T>(value: T, props?: SignalOptions<T>): Atom<T> => {
    const [state, setState] = createSignal<T>(value, props);

    return Object.assign(
        (...args: [] | [T]) => {
            if (args.length === 0) {
                return state();
            }
            /** @ts-ignore */
            return setState(...args);
        },
        {
            reflux,
            [AtomTypeSymbol]: 'atom',
            /** 转换为原来的写法，为了兼容其他 api 的要求 */
            toSignal() {
                return [state, setState];
            },
            getSetter() {
                return setState;
            },
            getGetter() {
                return state;
            },
        }
    ) as Atom<T>;
};

type makeReflux<T> = <C>(
    this: Atom<T>,
    /** 派生 Atom 的初始值 */
    init: C,
    /** 回流计算函数 */
    computed: (inputValue: C) => T,
    /** 派生 Atom 的初始参数 */
    Options?: SignalOptions<T>
) => Atom<C>;
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
const reflux: makeReflux<any> = function (init, computed, Options) {
    const that = this;
    const a = atom(init, Options);
    useEffectWithoutFirst(() => {
        that(() => computed(a()));
    }, [a]);
    a[AtomTypeSymbol] = 'reflux';
    return a;
};
