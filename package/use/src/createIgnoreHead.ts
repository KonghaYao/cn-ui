import { Accessor, createEffect } from 'solid-js';
import { EffectFunction } from 'solid-js/types/reactive/signal';

/** 忽略首次执行的 Effect */
export const createIgnoreFirst = (func: EffectFunction<void, void>, deps: Accessor<unknown>[]) => {
    let head = true;
    return createEffect(() => {
        if (head) {
            deps.forEach((i) => i());
            head = false;
        } else {
            func();
        }
    });
};
