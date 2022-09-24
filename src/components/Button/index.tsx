import cs from '../_util/classNames';
import { ButtonProps } from './interface';
import { Icon } from '../Icon/Icon';
import { createMemo, mergeProps } from 'solid-js';
import './style/index.less';
import { GlobalConfigStore } from '../ConfigProvider';

const defaultProps: ButtonProps = {
    htmlType: 'button',
};

export const Button = (baseProps: ButtonProps) => {
    const { componentConfig, rtl } = GlobalConfigStore;
    const props: ButtonProps = mergeProps(defaultProps, componentConfig?.Button, baseProps);
    const iconNode = createMemo(() => (props.loading ? <Icon name="refresh" spin /> : props.icon));

    const classNames = createMemo(() => {
        return cs(
            'cn-btn',
            props.type ?? 'secondary',
            props.size ?? 'normal',
            props.shape ?? 'square',
            props.status,
            {
                [`loading`]: props.loading,
                [`disabled`]: props.disabled,
                [`long`]: props.long,

                // 暂时未控制
                [`link`]: props.href,
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
    const children = createMemo(() => {
        // 如果没有标签会导致 flex 布局错误
        return typeof props.children === 'string' ? <span>{props.children}</span> : props.children;
    });
    const InnerContent = (
        <>
            {iconNode}
            {!props.iconOnly && children}
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
