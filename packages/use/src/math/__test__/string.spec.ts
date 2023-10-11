import { expect, test } from 'vitest';
import { getStringAreaIndex } from '../string';
import { genArray } from '@cn-ui/reactive';

test('getStringAreaIndex', () => {
    genArray(1000).map((i) => {
        expect(getStringAreaIndex(Math.random().toString(), 10)).below(10).above(-1);
    });
});
