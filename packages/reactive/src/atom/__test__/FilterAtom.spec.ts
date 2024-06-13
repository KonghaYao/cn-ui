import { renderHook } from "@solidjs/testing-library";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { genArray } from "../../utils";
import { DebounceAtom, ThrottleAtom } from "../FilterAtom";
import { atom } from "../atom";

describe("FilterTest", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    test("debounce", () => {
        const {
            result: { a, source },
        } = renderHook(() => {
            const source = atom("");
            return {
                a: DebounceAtom(source),
                source,
            };
        });

        expect(source()).eql(a());
        genArray(10).forEach(() => {
            vi.advanceTimersByTime(1);
            source(Math.random().toString());
        });
        expect(a()).eql("");
        vi.advanceTimersByTime(151);

        expect(a()).eql(source());
    });
    test("throttle", () => {
        const {
            result: { a, source },
        } = renderHook(() => {
            const source = atom("");
            return {
                a: ThrottleAtom(source),
                source,
            };
        });

        expect(source()).eql(a());

        const tags = genArray(10).map(() => {
            vi.advanceTimersByTime(10);
            const tag = Math.random().toString();

            source(tag);
            return tag;
        });
        expect(a()).eql(tags[0]);
        vi.advanceTimersByTime(100);
        expect(a()).eql(tags[0]);
        source("1000");
        expect(a()).eql("1000");
        vi.advanceTimersByTime(1000);
        source("1200");
        expect(a()).eql("1200");
    });
});
