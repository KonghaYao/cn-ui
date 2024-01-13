import { Atom, atom } from './atom';

export interface SetAtomType<T> extends Atom<Set<T>>, Pick<Set<T>, 'add' | 'clear' | 'delete'> {}

/** 未测试 */
export const SetAtom = <T>(initArray: T[]): SetAtomType<T> => {
    const set = atom(new Set(initArray), {
        equals: false,
    });

    return Object.assign(set, proxyAtomFn(set, ['add', 'clear', 'delete']));
};

export interface MapAtomType<T, I> extends Atom<Map<T, I>>, Pick<Map<T, I>, 'clear' | 'delete' | 'set'> {}

/** 未测试 */
export const MapAtom = <T, I>(initArray: Iterable<readonly [T, I]> | null | undefined): MapAtomType<T, I> => {
    const map = atom(new Map(initArray), {
        equals: false,
    });

    return Object.assign(map, proxyAtomFn(map, ['set', 'clear', 'delete']));
};

/** 代理原子内部数据对象的函数 */
export const proxyAtomFn = <T, const D extends keyof T = keyof T>(atom: Atom<T>, keys: D[]): Pick<T, D> => {
    return Object.fromEntries(
        keys.map((key) => {
            const originVal = atom()[key];
            const val = function (...args: any) {
                return typeof originVal === 'function' ? ((atom()[key] as Function)(...args), atom((i) => i)) : atom()[key];
            };
            return [key, val];
        })
    ) as unknown as Pick<T, D>;
};
