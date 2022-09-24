import { EditContentProps } from './interface';

import { Component, createMemo, JSXElement } from 'solid-js';
import copy from 'copy-to-clipboard';
import { Icon } from '../Icon';
import './style/edit.less';
import { atom } from 'solid-use';
export const CopyText: Component<EditContentProps> = (props) => {
    let container: HTMLSpanElement;
    return (
        <span>
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
};
// TODO 可编辑文本框
export const EllipsisText: Component<{ line: number; children: string }> = (props) => {
    const line = atom<'unset' | number>(props.line);
    const isOpen = createMemo(() => typeof line() === 'number');
    let container: HTMLSpanElement;
    return (
        <span
            ref={container!}
            style={{
                'line-clamp': line(),
                '-webkit-line-clamp': line(),
                overflow: 'hidden',
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
            }}
        >
            <span
                class="edit-text-icon"
                onclick={() => (isOpen() ? line('unset') : line(props.line))}
            >
                <Icon name={isOpen() ? 'arrow_drop_down' : 'arrow_drop_up'}></Icon>
            </span>
            {props.children}
        </span>
    );
};
