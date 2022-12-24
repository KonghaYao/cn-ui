import { Atom, atomization } from '@cn-ui/use';
import { Transition, TransitionGroup, TransitionGroupProps } from '@cn-ui/transition';
import { JSXElement, Component, splitProps, Show } from 'solid-js';
export const AnimateNames = ['slide', 'jumpFromTop', 'jumpFromBottom', 'zoom'] as const;
type TupleToUnion<T extends readonly any[]> = T[number];
export interface AnimeProps extends TransitionGroupProps {
    anime: TupleToUnion<typeof AnimateNames>;
    // trigger 在 group 情况下无效化
    trigger?: boolean | Atom<boolean>;
    group?: boolean;
    children: JSXElement;
}

/**
 * @zh 动画插件, css 文件需要单独导入
 */
export const Animate: Component<AnimeProps> = (props) => {
    const Comp = props.group ? TransitionGroup : Transition;
    const trigger = atomization(props.trigger ?? true);
    const [_, transProps] = splitProps(props, ['children']);

    return (
        <Comp
            {...transProps}
            enterActiveClass={'pointer-events-none animated ' + props.anime}
            exitActiveClass={'pointer-events-none animated animated-reverse ' + props.anime}
        >
            {props.group ? props.children : <Show when={trigger()}>{props.children}</Show>}
        </Comp>
    );
};
