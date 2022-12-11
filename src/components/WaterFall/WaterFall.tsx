import {
    Atom,
    atomization,
    OriginComponentInputType,
    OriginComponentOutputType,
    extendsEvent,
    OriginComponent,
    reflect,
} from '@cn-ui/use/src';
import { For, JSXElement } from 'solid-js';
interface WaterFallProps<T> {
    items: T[] | Atom<T[]>;
    column: number | Atom<number>;
    children: (data: T) => JSXElement;
}

export const WaterFall = OriginComponent(function <T>(
    props: OriginComponentInputType<WaterFallProps<T>>
) {
    const items = atomization(props.items);
    const column = atomization(props.column);
    const columnItems = reflect(() => {
        return items().reduce(
            (col, item, index) => {
                col[index % column()].push(item);
                return col;
            },
            [...Array(column()).keys()].map(() => [] as T[])
        );
    });
    return (
        <section class={props.class('flex gap-4')} style={props.style} {...extendsEvent(props)}>
            <For each={columnItems()}>
                {(items) => {
                    return (
                        <div class="flex flex-1 flex-col gap-4">
                            <For each={items}>{props.children}</For>
                        </div>
                    );
                }}
            </For>
        </section>
    );
});
