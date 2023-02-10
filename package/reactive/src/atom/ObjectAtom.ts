import { Atom, atom } from './atom';

export type FormKeyAtom<T> = {
    [key in keyof T]: Atom<T[key]>;
} & Atom<T>;
/** @zh 将键值对进行 key 分离，所有的 keyAtom 将会回流向原始 Atom ，所以并不是简单的生成关系 */
export const ObjectAtom = <T extends Record<string, unknown>>(obj: T) => {
    const hugeAtom = atom(obj, { equals: false });
    const splitStore = new Map();
    const keyStore = new Set(Object.keys(obj));
    return new Proxy(hugeAtom, {
        get(target, key: string, receiver) {
            if (!keyStore.has(key)) throw new Error(`key: ${key} can't be found in formObject!`);
            if (splitStore.has(key)) {
                return splitStore.get(key);
            } else {
                const newAtom = target.reflux(target()[key], (input) => {
                    // 注意，这里需要即时计算
                    (target() as any)[key] = input;
                    return target();
                });
                splitStore.set(key, newAtom);
                return newAtom;
            }
        },
        apply(target, thisArg, argArray) {
            return Reflect.apply(target, thisArg, argArray);
        },
    }) as FormKeyAtom<T>;
};
