import { Image, Space, Mask } from '@cn-ui/core';

import { atom } from '@cn-ui/use';
import { mockImages } from '../../mocks/images';
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
    const img = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';
    const images = atom([]);
    mockImages(5).then((res) => {
        images(res);
        console.log(images());
        addImages(
            images().map((i) => {
                return {
                    alt: '图片 ' + i,
                    src: i,
                };
            })
        );
    });
    return (
        <Space vertical>
            <Image height={100} width={100} src={images()[0] || img} {...props}></Image>
            <Image height={100} width={100} src="" block {...props}></Image>
            <h3>点击预览</h3>
            <Image
                height={100}
                width={100}
                src={images()[1] || img}
                {...props}
                onClick={() => getViewer().show()}
            ></Image>
            <Mask squircle>
                <Image height={100} width={100} src={images()[2] || img} {...props}></Image>
            </Mask>
        </Space>
    );
};
