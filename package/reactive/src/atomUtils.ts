import { Accessor } from 'solid-js';
import { Atom, atom } from './atom';
import { reflect } from './reflect';

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
export const atomization = <T>(prop: T | Atom<T> | Accessor<T>) => {
    // 保持 Accessor 的样式
    return typeof prop === 'function' ? prop : atom(prop);
};

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
