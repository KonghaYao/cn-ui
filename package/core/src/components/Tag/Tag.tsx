import { Match, Switch } from 'solid-js';
import {
    OriginComponentInputType,
    OriginComponentOutputType,
    OriginComponentType,
    emitEvent,
    extendsEvent,
    useEventController,
} from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';
import { Icon } from '../Icon';

import { JSX } from 'solid-js';
import { GlobalSize, Gradient, Colors, hSizeStairs } from '../_util/design';
import { IWithColorPart, withColor } from '../_util/design/withColor';
import { IWithGradientPart, withGradient } from '../_util/design/withGradient';

export interface PureTagProps extends JSX.HTMLAttributes<HTMLDivElement> {
    size?: GlobalSize;
    visible?: boolean;
    closable?: boolean;
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

export const GradientTag = withGradient(PureTag);
export const ColorTag = withColor(PureTag);

export type TagProps = PureTagProps & IWithColorPart & IWithGradientPart & {};
export const Tag = (props: OriginComponentInputType<TagProps, HTMLDivElement>) => {
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
};
