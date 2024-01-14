import { Atom, atom } from './atom';
import { proxyAtomFn } from '../utils/proxyAtomFn';

export interface MapAtomType<T, I> extends Atom<Map<T, I>>, Pick<Map<T, I>, 'clear' | 'delete' | 'set'> {}

/** 未测试 */
export const MapAtom = <T, I>(initArray: Iterable<readonly [T, I]> | null | undefined): MapAtomType<T, I> => {
    const map = atom(new Map(initArray), {
        equals: false,
    });

    return Object.assign(map, proxyAtomFn(map, ['set', 'clear', 'delete']));
};
