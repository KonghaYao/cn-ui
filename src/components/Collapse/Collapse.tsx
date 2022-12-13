import { Atom, atom, OriginComponentInputType, reflect } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import './style/index.css';
import { useSelect } from '@cn-ui/headless';
import { createContext, createEffect, JSX, JSXElement, on } from 'solid-js';
import { atomization } from '@cn-ui/use';
export const CollapseContext = createContext<
    {
        accordion: Atom<boolean>;
        lazyload: Atom<boolean>;
        destroyOnHide: Atom<boolean>;
    } & ReturnType<typeof useSelect>
>();

/**
 * @title Collapse
 */
export interface CollapseProps<T> extends JSX.HTMLAttributes<HTMLDivElement> {
    activeIds?: string[] | Atom<string[]>;
    children: JSXElement;

    /**
     * @zh 是否是手风琴模式
     * @en Whether to render as Accordion
     */
    accordion?: boolean | Atom<boolean>;

    /**
     * @zh 设置为 `true` 时，挂载时不会渲染被隐藏的面板。
     * @en If true, invisible panels will not be rendered on mount
     * @defaultValue true
     */
    lazyload?: boolean | Atom<boolean>;
    /**
     * @zh 是否销毁被折叠的面板
     * @en If true, panels will be unmounted on collapsing
     */
    destroyOnHide?: boolean | Atom<boolean>;
    /**
     * @zh 展开面板改变时触发
     * @en Callback when the active panel changes
     */
    onPanelChange?: (key: string, e) => void;
}
export const Collapse = OriginComponent(function <T>(
    props: OriginComponentInputType<CollapseProps<T>>
) {
    const activeIds = atomization(props.activeIds ?? []);
    const accordion = atomization(props.accordion);
    const multiControl = useSelect({
        activeIds,
        multi: reflect(() => !accordion()),
    });
    const lazyload = atomization(props.lazyload);
    const destroyOnHide = atomization(props.destroyOnHide);

    return (
        <CollapseContext.Provider
            value={{
                accordion,
                lazyload,
                destroyOnHide,
                ...multiControl,
            }}
        >
            {props.children}
        </CollapseContext.Provider>
    );
});
