import { Image, Space, Mask } from '@cn-ui/core';

import { atom, resource } from '@cn-ui/use';
import { mockImages } from './mocks/images';

import { useViewer } from '@cn-ui/viewer';
export default () => {
    const { getViewer, addImages } = useViewer({});
    const img = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg';
    const images = resource(
        async () => {
            const res = await mockImages(5);
            console.log(images());
            addImages(
                images().map((i) => {
                    return {
                        alt: '图片 ' + i,
                        src: i,
                    };
                })
            );
            return res;
        },
        { initValue: [] }
    );

    return (
        <Space vertical>
            <Image height={100} width={100} src={images()[0] || img}></Image>
            <Image
                height={100}
                width={100}
                src="https://media.istockphoto.com/id/1332176260/photo/man-working-at-a-creative-office-using-his-computer-and-people-moving-at-the-background.jpg?b=1&s=170667a&w=0&k=20&c=rtKCb7Aeihyoc4RpoC4PfiyUtDhX4vSJ8td3xG-9otc="
                block
            ></Image>
            <h3>点击预览</h3>
            <Image
                height={100}
                width={100}
                src={images()[1] || img}
                onClick={() => getViewer().show()}
            ></Image>
            <Mask squircle onClick={() => getViewer().show()}>
                <Image height={100} width={100} src={images()[2] || img}></Image>
            </Mask>
        </Space>
    );
};
