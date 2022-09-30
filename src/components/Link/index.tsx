import { GlobalConfigStore } from '../GlobalConfigStore';
import { LinkProps } from './interface';
import { Component, createMemo, mergeProps, Show } from 'solid-js';
import { Icon } from '../Icon';
import './style/index.less';
import { OriginComponent } from '../_util/OriginComponent';
const defaultProps: LinkProps = {
    hoverable: true,
};
export const Link = OriginComponent<LinkProps>((baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props = mergeProps(defaultProps, componentConfig?.Link, baseProps);
    const children = createMemo(() => {
        const children = props.children;
        return typeof children === 'string' ? <span>{children}</span> : children;
    });
    return (
        <span
            class={props.class('cn-link', {
                [`disabled`]: props.disabled,
                [props.status]: !!props.status,
                [`with-icon`]: !!props.icon,
                hoverless: !props.hoverable,
                [`rtl`]: rtl,
            })}
            ref={props.ref}
            style={props.style}
            onClick={(e) => {
                if (props.disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    props.onClick && (props.onClick as any)(e);
                }
            }}
        >
            <Show when={props.icon}>
                {typeof props.icon !== 'boolean' ? props.icon : <Icon name="link" />}
            </Show>

            {children()}
        </span>
    );
});
