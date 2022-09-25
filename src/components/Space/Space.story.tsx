import { Icon } from '../Icon';
import { Space } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'wrap',
    },
    {
        type: 'switch',
        default: false,
        prop: 'vertical',
    },

    {
        type: 'select',
        default: 'medium',
        prop: 'size',
        options: ['mini', 'small', 'medium', 'large'].map((i) => ({
            value: i,
        })),
    },
];
export default (props) => {
    const arr = (num) =>
        [...Array(num).keys()].map((i) => {
            return <div style={{ width: '3rem', 'background-color': '#eee' }}>{i}</div>;
        });
    return (
        <>
            <Space {...props}>{arr(20)}</Space>
            <Space {...props} split={<hr class="vertical"></hr>}>
                {arr(20)}
            </Space>
        </>
    );
};
