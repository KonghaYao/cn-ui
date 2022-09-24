import cs from '../_util/classNames';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { LinkProps } from './interface';
import { Component, createMemo, mergeProps } from 'solid-js';
import { Icon } from '../Icon';
import './index.less';
const defaultProps: LinkProps = {
    hoverable: true,
};

export const Link: Component<LinkProps> = (baseProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props: LinkProps = mergeProps(defaultProps, componentConfig?.Link, baseProps);
    const { style, children, icon, status, disabled, hoverable, ...rest } = props;

    // const TagWrapper = 'href' in props ? 'a' : 'span';
    const className = createMemo(() => {
        return cs(
            'cn-link',
            {
                [`disabled`]: disabled,
                [status]: status,
                [`with-icon`]: icon,
                hoverless: !hoverable,
                [`rtl`]: rtl,
            },
            props.className
        );
    });
    return (
        <span
            className={className()}
            ref={props.ref}
            {...rest}
            style={style}
            tabIndex={disabled ? -1 : undefined}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    props.onClick && props.onClick(e);
                }
            }}
        >
            {icon ? icon === true ? <Icon name="link" /> : icon : null}
            {typeof children === 'string' ? <span>{children}</span> : children}
        </span>
    );
};
