import cs from '../_util/classNames';
import { ButtonProps } from './interface';
import { Icon } from '../Icon/Icon';
import { createMemo, mergeProps } from 'solid-js';
import './style/index.less';
import { GlobalConfigStore } from '../ConfigProvider';

const defaultProps: ButtonProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
};

export const Button = (baseProps: ButtonProps) => {
    const { size: ctxSize, componentConfig, rtl } = GlobalConfigStore;
    const props: ButtonProps = mergeProps(baseProps, defaultProps, componentConfig?.Button);
    const iconNode = createMemo(() => (props.loading ? <Icon name="refresh" spin /> : props.icon));

    const classNames = createMemo(() => {
        return cs(
            'cn-btn',
            props.type === 'default' ? 'secondary' : props.type,
            `size-${props.size || ctxSize}`,
            `shape-${props.shape}`,
            {
                [`long`]: props.long,
                [`status-${props.status}`]: props.status,
                [`loading`]: props.loading,
                [`link`]: props.href,
                [`disabled`]: props.disabled,
                [`rtl`]: rtl,
            },
            props.className
        );
    });

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
            {!props.iconOnly && props.children}
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
            <a {...props} {..._anchorProps} className={classNames()} onClick={handleClick}>
                {InnerContent}
            </a>
        );
    }

    return (
        <button {...props} class={classNames()} type={props.htmlType} onClick={handleClick}>
            {InnerContent}
        </button>
    );
};
