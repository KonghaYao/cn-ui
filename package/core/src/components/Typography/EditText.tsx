import './style/edit.css';
import { EditContentProps } from './interface';
import { createMemo } from 'solid-js';
import copy from 'copy-to-clipboard';
import { atom, extendsEvent, useEventController, OriginComponent } from '@cn-ui/use';
import { DefaultIcon, Icon } from '../Icon';
export const CopyText = OriginComponent<EditContentProps>((props) => {
    let container: HTMLSpanElement;
    const control = useEventController({});
    const iconName = atom<'check' | 'content_copy'>('content_copy');
    return (
        <span ref={props.ref} class={props.class()} style={props.style} {...extendsEvent(props)}>
            <span ref={container!}>{props.children}</span>
            <DefaultIcon
                name={iconName()}
                class="edit-text-icon"
                onClick={control([
                    () => {
                        iconName('check');
                        copy(container.textContent, { format: 'text/plain' });
                    },
                    () => iconName('content_copy'),
                ])}
                color="green"
            ></DefaultIcon>
        </span>
    );
});
// TODO 可编辑文本框
export const EllipsisText = OriginComponent<{ line: number; children: string }>((props) => {
    const line = atom<'unset' | number>(props.line);
    const isOpen = createMemo(() => typeof line() === 'number');

    return (
        <span
            ref={props.ref}
            class={props.class('text-ellipsis')}
            style={{
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                'line-clamp': line(),
                '-webkit-line-clamp': line(),
                overflow: 'hidden',
                ...props.style,
            }}
            {...extendsEvent(props)}
        >
            <Icon
                class="scale-150 cursor-pointer px-1 text-sky-500"
                name={isOpen() ? 'arrow_drop_down' : 'arrow_drop_up'}
                onClick={() => (isOpen() ? line('unset') : line(props.line))}
            ></Icon>
            {props.children}
        </span>
    );
});
