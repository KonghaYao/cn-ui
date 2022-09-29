import cs from '../_util/classNames';
import { GlobalConfigStore } from '../GlobalConfigStore';
import { LinkProps } from './interface';
import { Component, createMemo, mergeProps } from 'solid-js';
import { Icon } from '../Icon';
import './style/index.less';
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

            props.className
        );
    });
    return (
        <span
            className={className()}
            classList={{
                [`disabled`]: disabled,
                [status]: !!status,
                [`with-icon`]: !!icon,
                hoverless: !hoverable,
                [`rtl`]: rtl,
            }}
            ref={props.ref}
            {...rest}
            style={style}
            tabIndex={disabled ? -1 : undefined}
            onClick={(e) => {
                if (disabled) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    props.onClick && (props.onClick as any)(e);
                }
            }}
        >
            {icon ? icon === true ? <Icon name="link" /> : icon : null}
            {typeof children === 'string' ? <span>{children}</span> : children}
        </span>
    );
};
