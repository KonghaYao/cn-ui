import { splitProps, untrack } from 'solid-js';

/**
 * @zh 继承原生事件, 但是原生事件全部不进行动态传递
 * @zh 注意，如果你使用了同名的事件，最好将其列入 Omits
 */
export const extendsEvent = <T extends {}>(props: T, Omits: string[] = []) => {
    const events = untrack(() => {
        return Object.keys(props).filter((i) => i.startsWith('on') && !Omits.includes(i));
    });

    return events.reduce((col, cur) => {
        col[cur] = props[cur];
        return col;
    }, {});
};
