import { atom, reflect } from '@cn-ui/use';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];

import { InputNumber, Slider } from '@cn-ui/core';
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
