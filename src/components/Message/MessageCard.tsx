import { ComponentProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { MessageProps } from './interface';
import { OriginComponent } from '@cn-ui/use';
import { DefaultIcon } from '@cn-ui/core';

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
                'cn-message pointer-events-auto relative flex flex-row items-center justify-evenly overflow-hidden rounded-lg border border-solid border-slate-200 bg-white px-4 py-1 text-center leading-none shadow-md'
            )}
            style={props.style}
        >
            <span>{props.icon}</span>
            <span>{props.content}</span>
            {props.closable && (
                <DefaultIcon
                    class="h-5 w-5"
                    name="close"
                    color="gray"
                    onClick={close}
                ></DefaultIcon>
            )}
        </div>
    );
});
