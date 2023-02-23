import { Match, Switch } from 'solid-js';
import { OriginComponentInputType, emitEvent, extendsEvent, useEventController } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { Icon } from '../Icon';

import { JSX } from 'solid-js';
import { GlobalSize, Gradient, Colors, hSizeStairs } from '../_util/design';

export interface TagProps extends JSX.HTMLAttributes<HTMLDivElement> {
    color?: keyof typeof Colors;
    size?: GlobalSize;
    visible?: boolean;
    closable?: boolean;
    gradient?: boolean;
    onClose?: (e) => void;
}

export const PureTag = OriginComponent<TagProps, HTMLDivElement>((props) => {
    const control = useEventController({});
    return (
        <div
            ref={props.ref}
            style={props.style}
            class={props.class(
                'cn-tag',
                'box-border inline-flex cursor-pointer select-none items-center rounded-md px-2 py-1 text-sm font-light leading-none  shadow-suit',
                hSizeStairs[props.size]
            )}
            {...extendsEvent(props)}
        >
            <div class="content">{props.children}</div>
            <Switch>
                <Match when={props.closable}>
                    <Icon
                        name="close"
                        class={`close-icon`}
                        onClick={control([emitEvent(props.onClick), emitEvent(props.onclick)])}
                    />
                </Match>
            </Switch>
        </div>
    );
});
export const GradientTag = OriginComponent<TagProps, HTMLDivElement>((props) => {
    return (
        <PureTag {...props} class={props.class(Gradient.position, Gradient[props.color])}></PureTag>
    );
});
export const ColorTag = OriginComponent<TagProps, HTMLDivElement>((props) => {
    return (
        <PureTag
            {...props}
            class={props.class(Colors[props.color], props.color !== 'white' && 'text-white')}
        ></PureTag>
    );
});

export const Tag = OriginComponent<TagProps, HTMLDivElement>((props) => {
    return (
        <Switch fallback={() => <PureTag {...props}></PureTag>}>
            <Match when={props.gradient}>
                <GradientTag {...props}></GradientTag>
            </Match>
            <Match when={props.color}>
                <ColorTag {...props}></ColorTag>
            </Match>
        </Switch>
    );
});
