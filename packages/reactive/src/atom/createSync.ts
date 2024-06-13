import { onCleanup } from "solid-js";
import { watch } from "solidjs-use";
import type { Atom } from "./atom";

export interface SyncOptions<T, D> {
    aEqual?: (a: T) => boolean;
    bEqual?: (b: D) => boolean;
}
export const createSync = <T, D>(
    a: Atom<T>,
    b: Atom<D>,
    AToB: (a: T) => D,
    BToA: (b: D) => T,
    config?: SyncOptions<T, D>,
) => {
    let cacheState: T | D | null;
    const aEqual = config?.aEqual ?? ((val) => val === cacheState);
    const bEqual = config?.bEqual ?? ((val) => val === cacheState);
    const stopA = watch([b], () => {
        if (bEqual(b())) return;
        const newA = BToA(b());
        a(() => newA);
        cacheState = newA;
    });
    const stopB = watch([a], () => {
        if (aEqual(a())) return;
        const newB = AToB(a());
        b(() => newB);
        cacheState = newB;
    });
    onCleanup(() => {
        cacheState = null;
    });
    return {
        /**
         * @dev
         */
        breakSync: () => {
            stopA();
            stopB();
        },
    };
};
