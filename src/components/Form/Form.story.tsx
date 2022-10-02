import { createMemo } from 'solid-js';
import { Message } from '../Message';
import { Space } from '../Space';
import { atom, reflect } from '../_util/atom';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroupData';
import { CheckGroupController } from './CheckGroupController';

export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'disabled',
    },
    {
        type: 'switch',
        default: false,
        prop: 'indeterminate',
    },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
export default (props) => {
    const checkbox = atom(true);
    const groupController = ['用户', '姓名', '操作'].map((i) => {
        return { value: atom(false), children: i };
    });

    return (
        <>
            <Space vertical>
                <CheckBox value={checkbox} {...props}>
                    同步更新
                </CheckBox>
                <CheckBox
                    value={checkbox}
                    onInput={async () => {
                        console.log('请等待 1000s');
                        const c = Message.loading('加载中');
                        await sleep(1000);
                        c();
                        Message.success('成功');
                        return true;
                    }}
                >
                    {checkbox() ? '选中' : '没选中'}
                </CheckBox>
            </Space>

            <Space>
                <CheckGroupController data={groupController}></CheckGroupController>
            </Space>
            <CheckGroup data={groupController}></CheckGroup>
        </>
    );
};
