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
            <CheckBox value={checkbox}>{checkbox() ? '选中' : '没选中'}</CheckBox>
        </Space>
    );
};
