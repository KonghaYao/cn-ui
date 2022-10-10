import { GlobalConfigStore } from '../GlobalConfigStore';
import { LinkProps } from './interface';
import { createMemo, mergeProps, Show } from 'solid-js';
import { Icon } from '../Icon';
import './style/index.less';
import { emitEvent, extendsEvent, OriginComponent, useEventController } from '@cn-ui/use';
const defaultProps: LinkProps = {
    hoverable: true,
};
export const Link = OriginComponent<LinkProps, HTMLSpanElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);
    const children = createMemo(() => {
        const children = props.children;
        return typeof children === 'string' ? <span>{children}</span> : children;
    });
    const control = useEventController({});
    return (
        <span
            class={props.class('cn-link')}
            classList={{
                [`disabled`]: props.disabled,
                [props.status]: !!props.status,
                [`with-icon`]: !!props.icon,
                hoverless: !props.hoverable,
            }}
            ref={props.ref}
            style={props.style}
            {...extendsEvent(props)}
            onClick={control([
                emitEvent(props.onClick),
                (e) => {
                    if (props.disabled) {
                        e.preventDefault();
                        e.stopPropagation();
                    } else {
                        props.onClick && (props.onClick as any)(e);
                    }
                },
            ])}
        >
            <Show when={props.icon}>
                {typeof props.icon !== 'boolean' ? props.icon : <Icon name="link" />}
            </Show>

            {children()}
        </span>
    );
});
