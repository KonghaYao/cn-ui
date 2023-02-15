import type { Accessor } from 'solid-js';
import { Atom, AtomTypeSymbol, atom } from '../atom/atom';

import { reflect } from '../atom/reflect';

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
function atomization<T>(prop: T | Atom<T> | Accessor<T>): Atom<T>;
function atomization<T extends (...args: any) => any>(prop: T): Atom<ReturnType<T>>;
function atomization<T>(prop: T | Atom<T> | Accessor<T>) {
    // 保持 Accessor 的样式

    return isAtom(prop)
        ? (prop as Atom<T>)
        : typeof prop === 'function'
        ? reflect((prop as Accessor<T> | Function)())
        : atom(prop);
}
export { atomization };

/** 判断是否为 Atom */
// function isAtom(a: Atom<any>): true;
function isAtom(a: any): boolean {
    return typeof (a as any)[AtomTypeSymbol] === 'string';
}
export { isAtom };
/**
 * @category atom
 * @zh 将响应式数组转化为单个响应式对象组成的数组
 * @en transform reactive array to an normal array includes reactive items
 * @example
 * const list = atom([1,2,3])
 *
 * const [atom1,atom2,atom3] =  AtomToArray(list)
 */
export const AtomToArray = <T>(atom: Atom<T[]>) => {
    return atom().map((_, index) => {
        return reflect(() => atom()[index]);
    });
};
