import { Component, JSXElement, Show, splitProps } from 'solid-js';
import { Transition } from './Transition';
import { TransitionGroup, TransitionGroupProps } from './TransitionGroup';
import { Atom, atomization } from '@cn-ui/use';

export type AllowAnime =
    | string
    | 'bounce'
    | 'flash'
    | 'pulse'
    | 'rubberBand'
    | 'shake'
    | 'headShake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'jello'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceInUp'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'bounceOutUp'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'rotateIn'
    | 'rotateInDownLeft'
    | 'rotateInDownRight'
    | 'rotateInUpLeft'
    | 'rotateInUpRight'
    | 'rotateOut'
    | 'rotateOutDownLeft'
    | 'rotateOutDownRight'
    | 'rotateOutUpLeft'
    | 'rotateOutUpRight'
    | 'hinge'
    | 'jackInTheBox'
    | 'rollIn'
    | 'rollOut'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomInUp'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutLeft'
    | 'zoomOutRight'
    | 'zoomOutUp'
    | 'slideInDown'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideInUp'
    | 'slideOutDown'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'slideOutUp'
    | 'heartBeat';

export interface AnimeProps extends TransitionGroupProps {
    in: AllowAnime;
    out: AllowAnime;
    trigger?: boolean | Atom<boolean>;
    group?: boolean;
    children: JSXElement;
}
/**
 * @zh 基于 animate.css 的一个插件, css 文件需要单独导入
 */
export const Anime: Component<AnimeProps> = (props) => {
    const Comp = props.group ? TransitionGroup : Transition;
    const trigger = atomization(props.trigger ?? true);
    const [_, transProps] = splitProps(props, ['children']);
    return (
        <Comp
            {...transProps}
            enterActiveClass={'animated ' + props.in}
            exitActiveClass={'animated ' + props.out}
        >
            <Show when={trigger()}>{props.children}</Show>
        </Comp>
    );
};
