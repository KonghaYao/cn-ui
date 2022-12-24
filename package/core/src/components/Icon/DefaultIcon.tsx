import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { createMemo } from 'solid-js';
import { Gradient } from '../_util/design';
import { Icon } from './Icon';
import { IconProps } from './interface';

export interface DefaultIconProps extends IconProps {
    color: keyof typeof Gradient;
    iconClass?: string;
}
export const DefaultIcon = OriginComponent<DefaultIconProps>((props) => {
    return (
        <div
            class={props.class(
                'cn-icon-wrapper  block cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gradient-to-b',
                Gradient[props.color]
            )}
            style={{ ...props.style }}
            ref={props.ref}
            {...extendsEvent(props)}
            onClick={props.onClick}
        >
            <Icon
                class={props.iconClass}
                name={props.name}
                size={props.size}
                spin={props.spin}
            ></Icon>
        </div>
    );
});
