import { Atom, atom, OriginComponentInputType, reflect } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import './style/index.css';
import { useMultiSelect } from './useMultiSelect';
import { createContext, createEffect, JSX, JSXElement, on } from 'solid-js';
import { atomization } from '@cn-ui/use';
export const CollapseContext = createContext<
    {
        accordion: Atom<boolean>;
        lazyload: Atom<boolean>;
        destroyOnHide: Atom<boolean>;
    } & ReturnType<typeof useMultiSelect>
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
    const multiControl = useMultiSelect({
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

// export const Collapse = OriginComponent<CollapseProps, HTMLDivElement>((props) => {
//     const [controllers, CommitController] = createSignal<Controller>({}, { equals: false });
//     return (
//         <CollapseContext.Provider
//             value={{
//                 CommitController,
//                 lazyload: props.lazyload,
//                 destroyOnHide: props.destroyOnHide,
//                 onToggle: (key, state, e) => {
//                     const c = controllers();
//                     if (props.accordion && state) {
//                         Object.entries(c).forEach(([name, toggle]) => {
//                             toggle(key === name);
//                         });
//                     } else {
//                         c[key](state);
//                     }
//                     props.onPanelChange && props.onPanelChange(key, e);
//                 },
//             }}
//         >
//             <div
//                 class={props.class('cn-collapse w-full')}
//                 style={props.style}
//                 ref={props.ref}
//                 {...extendsEvent(props)}
//             >
//                 {props.children}
//             </div>
//         </CollapseContext.Provider>
//     );
// });
