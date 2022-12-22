import { ComponentProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { MessageProps } from './interface';
import { OriginComponent } from '@cn-ui/use';
import { DefaultIcon } from '@cn-ui/core';
import { Gradient } from '../_util/design';

/** 渲染存在的数据 */
export const [MessageQueue, setMessage] = createStore<MessageData[]>([]);

export type MessageData = ComponentProps<typeof MessageCard>;
/** 渲染消息卡片 */
export const MessageCard = OriginComponent<MessageProps>((props) => {
    const close = () => setMessage((list) => list.filter((i) => i.id !== props.id));
    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-message animated pointer-events-auto relative flex flex-row items-center justify-evenly overflow-hidden rounded-lg  bg-gradient-to-b px-4 py-1 text-center  shadow-suit',
                Gradient.white
            )}
            style={props.style}
        >
            {props.icon}
            <span>{props.content}</span>
            {props.closable && (
                <DefaultIcon name="close" color="white" onClick={close}></DefaultIcon>
            )}
        </div>
    );
});
