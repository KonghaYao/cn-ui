import { For } from 'solid-js';
import { OutSpace, Position, DefaultIcon } from '@cn-ui/core';
import './style/index.css';
// 最小化动画载入
import '@cn-ui/animate/src/slide.css';

import { MessageQueue, MessageCard, setMessage, MessageData } from './MessageCard';
import { Animate } from '@cn-ui/animate';
const Root = () => {
    return (
        <Position
            left="50%"
            top="10%"
            style={{
                transform: 'translate(-50%, -5%)',
                height: '100vh',
            }}
        >
            <div class="flex flex-col gap-2">
                <Animate directly group anime="slide">
                    <For each={MessageQueue}>
                        {(props) => {
                            return <MessageCard {...props}></MessageCard>;
                        }}
                    </For>
                </Animate>
            </div>
        </Position>
    );
};

const sendMessage = (config: MessageData | string, ...over: Partial<MessageData>[]) => {
    const _config: MessageData = Object.assign(
        {
            id: Math.random().toString(),
        },
        ...over,
        typeof config === 'string' ? { content: config } : config
    );
    // 1. 加入消息队列
    setMessage((items) => {
        const index = items.findIndex((i) => {
            return i.id === _config.id;
        });
        return index === -1 ? [...items, _config] : [...items.splice(index, 1, _config)];
    });
    // 2. 添加删除信息
    const close = () => setMessage((list) => list.filter((i) => i.id !== _config.id));
    // console.log(_config);
    if (_config.duration > 0) {
        setTimeout(() => {
            close();
        }, _config.duration);
    }
    return close;
};

export class Message {
    static inited = false;
    static init() {
        if (Message.inited) return;

        OutSpace.addLayerLikeSet(Root); // 向 Top 位置注入 Root 组件
        Message.inited = true;
    }
    static DefaultConfig: Partial<MessageData> = {
        duration: 3000,
        closable: false,
    };
    static success(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'success',
            icon: () => DefaultIcon({ name: 'check', color: 'green' }),
        });
    }
    static loading(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'loading',
            icon: () => DefaultIcon({ name: 'autorenew', color: 'gray', spin: true }),
        });
    }
    static info(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'info',
            icon: () => DefaultIcon({ name: 'priority_high', color: 'blue' }),
        });
    }
    static warning(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'warning',
            icon: () => DefaultIcon({ name: 'priority_high', color: 'orange' }),
        });
    }
    static error(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'error',
            icon: () => DefaultIcon({ name: 'close', color: 'red' }),
        });
    }
    static normal(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'normal',
        });
    }
}

export const useMessage = () => {
    Message.init();
    return Message;
};
