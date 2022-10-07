import { createMemo } from 'solid-js';
import { Message } from '../../Message';
import { Space } from '../../Space';
import { atom, reflect } from '@cn-ui/use';
import { CheckBox } from '../CheckBox/CheckBox';
import { CheckGroup } from '../CheckBox/CheckGroup';
import { CheckGroupController } from '../CheckBox/CheckGroupController';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
import { InputNumber } from './InputNumber';
import { Button } from '../../Button';
import { Icon } from '../../Icon';
import { Slider } from './SLider';
export default (props) => {
    const val = atom(4);
    return (
        <div>
            <InputNumber {...props}></InputNumber>
            <InputNumber {...props} button step={4} value={val}></InputNumber>
            <InputNumber {...props} button min={0} max={10} step={2} value={val}></InputNumber>
            {val()}
            <Slider {...props} min={0} max={10} step={2} value={val}></Slider>
        </div>
    );
};
