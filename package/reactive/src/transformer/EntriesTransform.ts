import { ArrayAtom, reflect } from 'src/atom';
import type { Atom } from '../atom/atom';

export interface EntriesLike<
    T extends {
        set(key: string, val: string): void;
    }
> {
    new (): T;
    prototype: T;
    toString(): string;
}

/**
 * @zh ObjectAtom 的转换器，主要是服务于 FormData 等一系列的特殊属性
 * @example EntriesTransform(atomA).toFromData()
 */

export const EntriesTransform = <T extends Record<string, unknown>>(a: Atom<T>) => {
    const _addToEntriesLike = <
        D extends {
            set(key: string, val: string): void;
        }
    >(
        atom: Atom<T>,
        proto: EntriesLike<D>,
        input?: D
    ) => {
        const en = input ?? new proto();
        Object.entries(atom()).forEach(([key, val]) => {
            en!.set(key, (val as any).toString());
        });
        return en;
    };
    return {
        toKeyAtom() {
            return reflect(() => ArrayAtom(Object.keys(a)));
        },
        toEntries() {
            return Object.entries(a());
        },
        toFromData(fd?: FormData) {
            return _addToEntriesLike<FormData>(a, FormData, fd);
        },
        toSearchParams(sp?: URLSearchParams) {
            return _addToEntriesLike<URLSearchParams>(a, URLSearchParams, sp);
        },
        toHeaders(headers?: Headers) {
            return _addToEntriesLike<Headers>(a, Headers, headers);
        },
        toMap<D extends Map<any, any>>(map?: D) {
            return _addToEntriesLike<Map<any, any>>(a, Map, map);
        },
        toJSON() {
            return JSON.stringify(a());
        },
    };
};
