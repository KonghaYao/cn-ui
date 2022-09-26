import { Component, createSignal, For } from 'solid-js';
import { atom } from 'solid-use';
import { OuterSpaceRegister } from '../GlobalConfigStore/OuterSpace';
import { Position } from '../Mask/Position';
import { Space } from '../Space';
import { MessageProps } from './interface';
import './style/index.less';
/** 渲染存在的数据 */
const [MessageQueue, setMessage] = createSignal<MessageProps[]>([]);

/** 渲染消息卡片 */
const MessageCard: Component<MessageProps> = (props) => {
    return <div class="cn-message">{props.content}</div>;
};
const Root = () => {
    return (
        <Position
            left="50%"
            top="5%"
            style={{
                transform: 'translate(-50%, -5%)',
                height: '100vh',
            }}
        >
            <Space vertical size="mini">
                {MessageQueue().map((props) => {
                    console.log('渲染', props);
                    return <MessageCard {...props}></MessageCard>;
                })}
            </Space>
        </Position>
    );
};
OuterSpaceRegister({ slot: 'Inner', list: true, component: Root });

const sendMessage = (config: MessageProps, ...over: Partial<MessageProps>[]) => {
    // 1. 加入消息队列
    setMessage((items) => {
        const index = items.findIndex((i) => {
            return i.id === config.id;
        });
        const newItem = Object.assign({}, ...over, config);

        return index === -1 ? [...items, newItem] : [...items.splice(index, 1, newItem)];
    });
    // 2. 添加删除信息
    setTimeout(() => {
        setMessage((list) => list.filter((i) => i.id !== config.id));
    }, config.duration);
};

export class Message {
    static DefaultConfig = {
        duration: 3000,
    };
    static success(config: MessageProps) {
        sendMessage(config, Message.DefaultConfig, { type: 'success' });
    }
}
