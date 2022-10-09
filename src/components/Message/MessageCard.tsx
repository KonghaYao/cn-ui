import { ComponentProps } from 'solid-js';
import { createStore } from 'solid-js/store';
import { MessageProps } from './interface';
import { OriginComponent } from '@cn-ui/use';
import { DefaultIcon } from '../Icon/DefaultIcon';

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
                'cn-message relative flex flex-row justify-evenly items-center px-4 py-3 leading-none border border-solid border-slate-200 rounded-lg bg-white overflow-hidden pointer-events-auto shadow-md text-center'
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
