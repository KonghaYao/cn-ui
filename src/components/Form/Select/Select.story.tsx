import { atom, reflect } from '@cn-ui/use';
import { Select, InputColor, Rate } from '@cn-ui/core';

export const Controller = [{ type: 'switch', default: false, prop: 'disabled' }];

export default (props) => {
    const val = atom('');
    const options = atom(
        [...Array(10).keys()].flatMap((i) => [
            'Beijing',
            'Shanghai',
            'Guangzhou',
            'Disabled',
            '343'.repeat(10),
            '232312',
            '323232',
        ])
    );
    const color = atom('');
    const rate = atom(0);
    return (
        <div>
            <Select {...props} value={val} options={options}></Select>
            <InputColor {...props} value={color}></InputColor>
            <Rate {...props} value={rate}></Rate>
            <Rate {...props} value={rate} allowHalf></Rate>
        </div>
    );
};
