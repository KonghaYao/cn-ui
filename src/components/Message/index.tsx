import { createSignal, For } from 'solid-js';
import { OuterSpaceRegister } from '../GlobalConfigStore/OuterSpace';
import { Position } from '../Mask/Position';
import { Space } from '../Space';
import './style/index.less';
// 最小化动画载入
import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutUp.css';
import { MessageQueue, MessageCard, setMessage, MessageData } from './MessageCard';
import { DefaultIcon } from './DefaultIcon';
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
            <Space
                transition={{
                    enterActiveClass: 'animated fadeInDown',
                    exitActiveClass: 'animated fadeOutUp',
                }}
                vertical
                className="animated"
                size="mini"
            >
                <For each={MessageQueue}>
                    {(props) => {
                        return <MessageCard {...props}></MessageCard>;
                    }}
                </For>
            </Space>
        </Position>
    );
};
OuterSpaceRegister({ slot: 'Inner', list: true, component: Root });

const sendMessage = (config: MessageData | string, ...over: Partial<MessageData>[]) => {
    const _config: MessageData =
        typeof config === 'string' ? { content: config } : Object.assign({}, ...over, config);
    // 1. 加入消息队列
    setMessage((items) => {
        const index = items.findIndex((i) => {
            return i.id === _config.id;
        });
        return index === -1 ? [...items, _config] : [...items.splice(index, 1, _config)];
    });
    // 2. 添加删除信息

    const close = () => setMessage((list) => list.filter((i) => i.id !== _config.id));
    console.log(_config);
    if (_config.duration > 0) {
        setTimeout(() => {
            close();
        }, _config.duration);
    }
    return close;
};

export class Message {
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
            icon: () => DefaultIcon({ name: 'refresh', color: 'gray', spin: true }),
        });
    }
    static info(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'info',
            icon: () => DefaultIcon({ name: 'info', color: 'blue' }),
        });
    }
    static warning(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'warning',
            icon: () => DefaultIcon({ name: 'warning_amber', color: 'orange' }),
        });
    }
    static error(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'error',
            icon: () => DefaultIcon({ name: 'error', color: 'red' }),
        });
    }
    static normal(config: MessageData | string) {
        return sendMessage(config, Message.DefaultConfig, {
            type: 'normal',
        });
    }
}
