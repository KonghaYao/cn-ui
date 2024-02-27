import { areaList } from "@vant/area-data"
import { compress, decompress } from "../src/compress.js"
import { describe } from "vitest"
import { it } from "vitest"
import { expect } from "vitest"
var list = areaList.county_list



describe('data equal', () => {
    it('compress and decompress equal origin data', () => {
        const compressed = compress(list)

        expect(compressed.length).greaterThan(1000)
        const hasNumber = compressed.some(item => typeof item === 'number');
        expect(hasNumber).toBe(true);

        const hasString = compressed.some(item => typeof item === 'string');
        expect(hasString).toBe(true);
        const deData = decompress(compressed)
        expect(deData).eql(list)
    })
})