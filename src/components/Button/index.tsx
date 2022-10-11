import { ButtonProps } from './interface';
import { Icon } from '../Icon';
import { createMemo, mergeProps, Show } from 'solid-js';
import './style/index.less';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
const defaultProps: ButtonProps = {
    htmlType: 'button',
};

export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);

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
            <Show when={props.loading}>
                <Icon name="refresh" spin />
            </Show>
            {props.icon}
            {!props.iconOnly && children}
        </>
    );
    const classNames = createMemo(() =>
        props.class(
            'cn-btn ',
            props.type ?? 'secondary',
            props.size ?? 'normal',
            props.shape ?? 'square',
            props.status,
            {
                [`loading`]: props.loading,
                [`disabled`]: props.disabled,
                [`block`]: props.block,

                // 暂时未控制
                [`link`]: props.href,
            }
        )
    );
    return (
        <button
            ref={props.ref}
            class={classNames()}
            style={props.style}
            type={props.htmlType}
            {...extendsEvent(props)}
            onClick={handleClick}
        >
            {InnerContent}
        </button>
    );
});
