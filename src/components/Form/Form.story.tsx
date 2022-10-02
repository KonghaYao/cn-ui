import { Message } from '../Message';
import { Space } from '../Space';
import { atom } from '../_util/atom';
import { CheckBox } from './CheckBox';

export const Controller = [];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
export default (props) => {
    const checkbox = atom(true);
    return (
        <Space vertical>
            <CheckBox
                value={checkbox}
                onValueChange={async () => {
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
    );
};
