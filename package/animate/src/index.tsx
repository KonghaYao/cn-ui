import { Atom, atomization, classNames } from '@cn-ui/use';
import { Transition, TransitionGroup, TransitionGroupProps } from '@cn-ui/transition';
import { JSXElement, Component, splitProps, Show, mergeProps } from 'solid-js';
export const AnimateNames = ['slide', 'jumpFromTop', 'jumpFromBottom', 'zoom', 'scale'] as const;
type TupleToUnion<T extends readonly any[]> = T[number];
export interface AnimateProps extends TransitionGroupProps {
    anime: TupleToUnion<typeof AnimateNames>;
    extraClass?: string;
    /* 直接渲染，不使用 trigger 的 show*/
    directly?: boolean;
    /** trigger 在 group 情况下无效化 */
    trigger?: boolean | Atom<boolean>;
    group?: boolean;
    fallback?: JSXElement;
    children: JSXElement;
}

/**
 * @zh 动画插件, css 文件需要单独导入
 */
export const Animate: Component<AnimateProps> = (props) => {
    const Comp = props.group ? TransitionGroup : Transition;
    const trigger = atomization(props.trigger ?? true);
    const [_, transProps] = splitProps(props, ['children']);
    return (
        <Comp
            {...transProps}
            enterActiveClass={
                'pointer-events-none animated ' + props.anime + ' ' + props.extraClass
            }
            exitActiveClass={
                'animated-reverse pointer-events-none animated ' +
                props.anime +
                ' ' +
                props.extraClass
            }
        >
            {props.directly ? (
                props.children
            ) : (
                <Show when={trigger()} fallback={props.fallback}>
                    {props.children}
                </Show>
            )}
        </Comp>
    );
};
