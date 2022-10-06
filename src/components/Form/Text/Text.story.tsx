import { createMemo } from 'solid-js';
import { Message } from '../../Message';
import { Space } from '../../Space';
import { atom, reflect } from '@cn-ui/use';
import { CheckBox } from '../CheckBox/CheckBox';
import { CheckGroup } from '../CheckBox/CheckGroupData';
import { CheckGroupController } from '../CheckBox/CheckGroupController';

export const Controller = [
    { type: 'switch', default: false, prop: 'disabled' },
    { type: 'switch', default: true, prop: 'showWordLimit' },
    { type: 'switch', default: true, prop: 'allowClear' },
];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { InputText } from './InputText';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
export default (props) => {
    const val = atom('');
    return (
        <div>
            <InputText {...props}></InputText>
            <InputText {...props} maxLength={10} value={val}></InputText>
            <InputText
                {...props}
                value={val}
                allowClear={false}
                icon={'https://'}
                showWordLimit={false}
            >
                <Button size="mini" type="primary">
                    <Icon name="search"></Icon>
                </Button>
            </InputText>
        </div>
    );
};
