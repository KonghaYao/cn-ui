import { createMemo, For } from 'solid-js';
import { atom } from 'solid-use';
import { Icon } from '../Icon';
import { Space } from '../Space';
import { COLORS, Tag } from './index';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'closable',
    },
    {
        type: 'switch',
        default: false,
        prop: 'bordered',
    },
    {
        type: 'select',
        default: 'default',
        prop: 'color',
        options: COLORS.map((i) => ({ value: i })),
    },
];
export default (props) => {
    const sleep = (ms) =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), ms);
        });
    const data = [...Array(5).keys()].map((i) => {
        return {
            name: 'tag ' + i,
            value: atom(true),
            content: [...Array(i + 1).keys()].join(' '),
            onClose: () => sleep(i * 100),
            color: COLORS[i % 10],
        };
    });
    // 想要获取 所有标签的打开值:
    //  data.map((i) => i.value());
    const Value = data[0].value;
    const Content = createMemo(() => {
        console.log('重新绘制');
        return data
            .filter((i) => i.value())
            .map((item) => {
                return (
                    <Tag color={item.color} checked={item.value} onClose={item.onClose} {...props}>
                        {item.content}
                    </Tag>
                );
            });
    });
    return (
        <>
            <button onclick={() => Value(!Value())}>受控标签: {Value() ? 'true' : 'false'}</button>
            <Tag>这是一个标签</Tag>
            <Space size="mini">{Content()}</Space>
        </>
    );
};
