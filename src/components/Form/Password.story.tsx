import { createMemo } from 'solid-js';
import { Message } from '../Message';
import { Space } from '../Space';
import { atom, reflect } from '@cn-ui/use';
import { CheckBox } from './CheckBox';
import { CheckGroup } from './CheckGroupData';
import { CheckGroupController } from './CheckGroupController';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'score' },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { Password } from './Password/Password';
export default (props) => {
    return (
        <div>
            <Password {...props}></Password>
        </div>
    );
};
