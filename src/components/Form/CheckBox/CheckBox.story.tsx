import { Message } from '../../Message';
import { Space } from '../../Space';
import { atom, reflect } from '@cn-ui/use';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroupData';
import { CheckGroupController, useCheckGroup } from './CheckGroupController';
import { Button } from '../../Button';

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
        return { value: atom(false), disabled: props.disabled, children: i };
    });
    const { inverse } = useCheckGroup(groupController);
    return (
        <>
            <Space vertical>
                <CheckBox value={checkbox} {...props}>
                    同步更新
                </CheckBox>
                <CheckBox
                    value={checkbox}
                    onValueInput={async () => {
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
                <Button onClick={inverse} size="mini">
                    反选
                </Button>
            </Space>
            <CheckGroup data={groupController}></CheckGroup>
            <h3>单选框</h3>
            <CheckGroup data={groupController} maxCheck={1}></CheckGroup>
            <h3>二选框</h3>
            <CheckGroup
                data={groupController}
                maxCheck={2}
                onOverCheck={() => {
                    Message.info('先关闭它吧');
                }}
            ></CheckGroup>
        </>
    );
};
