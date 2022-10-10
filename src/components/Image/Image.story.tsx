import { Icon } from '../Icon';
import { Space } from '../Space';
import { Image, useViewer } from './index';
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
    const { getViewer, addImages } = useViewer({});
    addImages([
        {
            alt: '信息',
            src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        },
    ]);
    return (
        <Space vertical>
            <Image
                height={100}
                width={100}
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                {...props}
            ></Image>
            <Image height={100} width={100} src="" block {...props}></Image>
            <h3>点击预览</h3>
            <Image
                height={100}
                width={100}
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
                {...props}
                onClick={() => getViewer().show()}
            ></Image>
        </Space>
    );
};
