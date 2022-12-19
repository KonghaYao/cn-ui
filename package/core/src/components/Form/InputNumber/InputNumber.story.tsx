import { atom, reflect } from '@cn-ui/use';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];

import { InputNumber, Slider, Space } from '@cn-ui/core';
export default (props) => {
    const val = atom(4);
    return (
        <Space vertical class="m-4 ">
            <InputNumber {...props} min={0} max={100}></InputNumber>
            <InputNumber {...props} button step={4} value={val}></InputNumber>
            <InputNumber
                {...props}
                button
                min={0}
                max={10}
                step={2}
                value={val}
                disabled_input
            ></InputNumber>
            {val()}
            <Slider {...props} min={0} max={10} step={2} value={val}></Slider>
        </Space>
    );
};
