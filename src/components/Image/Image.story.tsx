import { Icon } from '../Icon';
import { Space } from '../Space';
import { Image } from './index';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'round',
    },

    {
        type: 'select',
        default: 'cover',
        prop: 'fit',
        options: ['cover', 'contain', 'fill', 'none', 'scale-down'].map((i) => ({
            value: i,
        })),
    },
    {
        type: 'select',
        default: 'center',
        prop: 'position',
        options: ['center', 'top', 'right', 'bottom', 'left'].map((i) => ({
            value: i,
        })),
    },
];
export default (props) => {
    return (
        <Space vertical>
            <Image
                height={100}
                width={100}
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                {...props}
            ></Image>
            <Image height={100} width={100} src="" block {...props}></Image>
            <Image
                height={100}
                width={100}
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                forceLoading
                {...props}
            ></Image>
        </Space>
    );
};
