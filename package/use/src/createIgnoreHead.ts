import { Accessor, createEffect } from 'solid-js';
import { EffectFunction } from 'solid-js/types/reactive/signal';

/**
 * @zh 忽略首次执行的 Effect, 但是你需要手动声明依赖
 * @en createEffect But ignore the first time, like react you need to declare deps
 *  */
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
