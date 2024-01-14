import { untrack } from 'solid-js';

export type ExtractOnKeys<T extends object> = {
    [P in keyof T as P extends `on${string}` ? P : never]: T[P];
};

/**
 * @zh 在子组件中继承原生事件, 但是原生事件全部不进行动态传递
 * @zh 注意，如果你使用了同名的事件，最好将其列入 Omits
 */
export const extendsEvent = <T extends object>(props: T): ExtractOnKeys<T> => {
    const events = untrack(() => {
        return Object.keys(props).filter((i) => i.startsWith('on'));
    });

    return events.reduce((col, cur) => {
        /** @ts-ignore */
        col[cur] = props[cur];
        return col;
    }, {} as ExtractOnKeys<T>);
};
