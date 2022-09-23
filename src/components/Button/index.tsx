import cs from '../_util/classNames';
import { ButtonProps } from './interface';
import { Icon } from '../Icon/Icon';
import { createMemo, mergeProps } from 'solid-js';
import { GlobalConfigStore } from '../ConfigProvider';

const defaultProps: ButtonProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
};

export const Button = (baseProps: ButtonProps) => {
    const { getPrefixCls, size: ctxSize, componentConfig, rtl } = GlobalConfigStore;
    const props: ButtonProps = mergeProps(baseProps, defaultProps, componentConfig?.Button);
    const iconNode = createMemo(() => (props.loading ? <Icon name="refresh" spin /> : props.icon));
    const prefixCls = 'cn-btn';
    const _type = props.type === 'default' ? 'secondary' : props.type;
    const classNames = cs(
        prefixCls,
        `${prefixCls}-${_type}`,
        `${prefixCls}-size-${props.size || ctxSize}`,
        `${prefixCls}-shape-${props.shape}`,
        {
            [`${prefixCls}-long`]: props.long,
            [`${prefixCls}-status-${props.status}`]: props.status,
            [`${prefixCls}-loading-fixed-width`]: props.loadingFixedWidth,
            [`${prefixCls}-loading`]: props.loading,
            [`${prefixCls}-link`]: props.href,
            [`${prefixCls}-icon-only`]:
                props.iconOnly || (!props.children && props.children !== 0 && iconNode),
            [`${prefixCls}-disabled`]: props.disabled,
            [`${prefixCls}-rtl`]: rtl,
        },
        props.className
    );

    const handleClick = (event: Event): void => {
        if (props.loading) {
            typeof event?.preventDefault === 'function' && event.preventDefault();
            return;
        }
        props.onClick && props.onClick(event);
    };

    const InnerContent = (
        <>
            {iconNode}
            {props.children}
        </>
    );

    if (props.href) {
        const _anchorProps = { ...props.anchorProps };
        if (props.disabled) {
            delete _anchorProps.href;
        } else {
            _anchorProps.href = props.href;
        }
        return (
            <a {...props} {..._anchorProps} className={classNames} onClick={handleClick}>
                {InnerContent}
            </a>
        );
    }

    return (
        <button {...props} class={classNames} type={props.htmlType} onClick={handleClick}>
            {InnerContent}
        </button>
    );
};
