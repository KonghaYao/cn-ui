// Core SortableJS (without default plugins)
import {
    Accessor,
    children,
    createDeferred,
    createEffect,
    For,
    JSX,
    JSXElement,
    mergeProps,
    onCleanup,
    onMount,
    untrack,
} from 'solid-js';
import SortableCore from 'sortablejs';
import { OriginComponent, Atom, atomization } from '@cn-ui/use';
export { SortableCore };
export interface SortableProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children: JSXElement;
    options?: SortableCore.Options;
}
export const Sortable = OriginComponent<SortableProps>((props) => {
    let container: HTMLDivElement;
    let sortable: SortableCore;
    onMount(() => {
        sortable = new SortableCore(container, props.options);
    });
    onCleanup(() => {
        sortable && sortable.destroy();
    });
    return <div ref={container}>{props.children}</div>;
});
export interface SortableListProps<T, U extends JSXElement = JSXElement> {
    each: T[] | Atom<T[]>;
    fallback?: JSX.Element;
    /** 获取 each 中的元素的 id 的方法，默认获取 */
    getId?: (item: T) => string;
    children: (item: T, index: Accessor<number>) => U;
    options?: SortableCore.Options;
}
export const SortableList = OriginComponent<SortableListProps>((props) => {
    props = mergeProps(
        {
            options: {},
        },
        props
    );
    const getId = props.getId || ((item) => (item as any).id.toString());

    const each = atomization(props.each);
    let container: HTMLDivElement;

    let sortable: SortableCore;

    onMount(() => {
        sortable = new SortableCore(container, {
            ...props.options,

            onEnd() {
                props.options?.onEnd?.apply(this, arguments);

                console.log(sortable.toArray());
                each((i) => {
                    const list = sortable.toArray().map((id) => {
                        return i.find((item) => getId(item) === id);
                    });
                    console.log(list);
                    return list;
                });
            },
        });
        createEffect(() => {
            const IdMap = each().map((i) => getId(i));
            if (sortable.toArray().join(',') !== IdMap.join(',')) sortable.sort(IdMap, true);
        });
    });
    onCleanup(() => {
        sortable && sortable.destroy();
    });
    return (
        <div ref={container}>
            <For each={untrack(each)} fallback={props.fallback}>
                {props.children}
            </For>
        </div>
    );
});
