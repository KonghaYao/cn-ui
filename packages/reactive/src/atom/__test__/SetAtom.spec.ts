import { renderHook } from '@solidjs/testing-library';
import { test, vi, describe, it } from 'vitest';
import { SetAtom, SetAtomType } from '../SetAtom';
import { Atom, reflect } from '..';

describe('SetAtom', () => {
    let setAtom: SetAtomType<number>;
    let size: Atom<number>;
    beforeEach(() => {
        let { result } = renderHook(() => {
            const source = SetAtom([1, 2]);
            return {
                size: reflect(() => source().size),
                source,
            };
        });
        size = result.size;
        setAtom = result.source;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('SetAtom', () => {
        expect(size()).toBe(2);
        setAtom.add(2);
        expect(size()).toBe(2);
        setAtom.add(3);
        expect(size()).toBe(3);
        expect(setAtom.toArray()).toEqual([1, 2, 3]);

        setAtom.delete(2);
        expect(size()).toBe(2);
        expect(setAtom.toArray()).toEqual([1, 3]);
    });
    describe('difference', () => {
        it('should remove elements from the set that are present in setOrArray', () => {
            const setOrArray = new Set([2, 3, 4]);
            expect(setAtom.difference(setOrArray)).toEqual(new Set([1]));
        });

        it('should remove elements from the set that are present in setOrArray when by function is provided', () => {
            const setOrArray = new Set([2.2, 3.3, 4.4]);
            expect(setAtom.difference(setOrArray, Math.floor)).toEqual(new Set([1]));
        });
    });

    describe('intersection', () => {
        it('should return a new set with elements that are common to both sets', () => {
            const setOrArray = new Set([2, 3]);
            expect(setAtom.intersection(setOrArray)).toEqual(new Set([2]));
        });

        it('should return a new set with elements that are common to both sets when by function is provided', () => {
            const setOrArray = new Set([2.2, 3.3]);
            expect(setAtom.intersection(setOrArray, Math.floor)).toEqual(new Set([2]));
        });
    });

    describe('union', () => {
        it('should return a new set with elements from both sets', () => {
            const setOrArray = new Set([4, 5]);
            expect(setAtom.union(setOrArray)).toEqual(new Set([1, 2, 4, 5]));
        });

        it('should return a new set with elements from both sets when by function is provided', () => {
            const setOrArray = new Set([4.5, 5.5]);
            expect(setAtom.union(setOrArray, Math.floor)).toEqual(new Set([1, 2, 4.5, 5.5]));
        });
    });

    describe('xor', () => {
        it('should return a new set with elements that are in one of the sets, but not in both', () => {
            const setOrArray = new Set([4]);
            expect(setAtom.xor(setOrArray)).toEqual(new Set([1, 2, 4]));
        });

        it('should return a new set with elements that are in one of the sets, but not in both when by function is provided', () => {
            const setOrArray = new Set([4.4]);
            expect(setAtom.xor(setOrArray, Math.floor)).toEqual(new Set([1, 2, 4.4]));
        });
    });

    describe('addList', () => {
        it('should add elements from the list to the set', () => {
            const list = [4, 5];
            expect(setAtom.addList(list)).toEqual(new Set([1, 2, 4, 5]));
        });
    });
    describe('deleteList', () => {
        it('should delete elements from the list from the set', () => {
            const list = [4, 5];
            expect(setAtom.deleteList(list)).toEqual(new Set([1, 2]));
        });
    });
});
