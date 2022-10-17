// Core SortableJS (without default plugins)
import {
    Accessor,
    Component,
    createContext,
    createEffect,
    For,
    JSX,
    JSXElement,
    mergeProps,
    onCleanup,
    onMount,
    untrack,
    useContext,
} from 'solid-js';
import SortableCore from 'sortablejs';
import { OriginComponent, Atom, atomization, extendsEvent } from '@cn-ui/use';
export { SortableCore };

/** 非响应式的，但是完全控制的 Sortable js 组件 */
export const useSortable = (options: SortableCore.Options) => {
    let sortable: SortableCore;

    onCleanup(() => {
        sortable && sortable.destroy();
    });
    return {
        initSort(ref: HTMLElement) {
            sortable = new SortableCore(ref, options);
        },
        getSortable() {
            return sortable;
        },
    };
};

export interface SortableListProps<T> extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'children'> {
    each: T[] | Atom<T[]>;
    fallback?: JSX.Element;
    /** 获取 each 中的元素的 id 的方法，默认获取 */
    getId?: (item: T) => string;
    children: (item: T, index: Accessor<number>) => JSXElement;
    options?: SortableCore.Options;
}

export const SortableShared = createContext<{
    /** 当使用 sharedList 的时候进行数据的统一 */
    sharedData?: Atom<unknown[]>[];
    /** 默认参数 */
    options?: SortableCore.Options;
}>({});
/**
 * @zh 使用响应式对象操控可排序列表
 */
export const SortableList = OriginComponent((baseProps) => {
    const context = useContext(SortableShared);
    const props = mergeProps(
        {
            options: context.options ?? {},
        },
        baseProps
    ) as unknown as SortableListProps<unknown>;
    const getId = props.getId || ((item) => (item as any).id.toString());

    const RefreshData = () => {
        const sortable = getSortable();
        each(() => {
            const groupData = context.sharedData?.flatMap((i) => i());
            return sortable.toArray().map((id) => {
                return groupData.find((item) => getId(item) === id);
            });
        });
    };
    const { initSort, getSortable } = useSortable({
        ...props.options,

        onSort() {
            const sortable = getSortable();
            props.options?.onSort?.apply(this, arguments);
            each((i) => {
                const list = sortable.toArray().map((id) => {
                    return i.find((item) => getId(item) === id);
                });
                return list;
            });
        },

        onAdd() {
            props.options?.onAdd?.apply(this, arguments);
            RefreshData();
        },
        onRemove() {
            props.options?.onRemove?.apply(this, arguments);
            RefreshData();
        },
    });

    const each = atomization(props.each);

    createEffect(() => {
        const sortable = getSortable();
        if (sortable) {
            const IdMap = each().map((i) => getId(i));
            if (sortable.toArray().join(',') !== IdMap.join(',')) sortable.sort(IdMap, true);
        }
    });
    return (
        <div
            ref={initSort}
            /** @ts-ignore */
            class={props.class()}
            style={props.style}
            {...extendsEvent(props)}
        >
            <For each={untrack(each)} fallback={props.fallback}>
                {props.children}
            </For>
        </div>
    );
}) as unknown as <T>(props: SortableListProps<T>) => JSXElement;
