import { EditContentProps } from './interface';

import { Component, createMemo, JSXElement } from 'solid-js';
import copy from 'copy-to-clipboard';
import { Icon } from '../Icon';
import './style/edit.less';
import { atom, extendsEvent } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';

export const CopyText = OriginComponent<EditContentProps>((props) => {
    let container: HTMLSpanElement;
    return (
        <span ref={props.ref} class={props.class()} style={props.style} {...extendsEvent(props)}>
            <span ref={container!}>{props.children}</span>
            <span
                class="edit-text-icon"
                onclick={() => {
                    copy(container.textContent, { format: 'text/plain' });
                }}
            >
                {/* TODO 复制完成动画 */}
                <Icon name="content_copy"></Icon>
            </span>
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
            <span
                class="px-1 cursor-pointer text-sky-500"
                onclick={() => (isOpen() ? line('unset') : line(props.line))}
            >
                <Icon name={isOpen() ? 'arrow_drop_down' : 'arrow_drop_up'}></Icon>
            </span>
            {props.children}
        </span>
    );
});
