import type { Meta, StoryObj } from 'storybook-solidjs';

import { WaterFall } from './index';
import { photos } from './example/photos';

const meta = {
    title: 'Layout/WaterFall',
    component: WaterFall,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof WaterFall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        return (
            <WaterFall items={photos}>
                {(item) => {
                    return (
                        <img
                            class="object-cover"
                            // 自动铺满需要这样设置
                            style={{
                                'aspect-ratio': `${item.height}/${item.width}`,
                            }}
                            src={item.src}
                        ></img>
                    );
                }}
            </WaterFall>
        );
    },
    args: {},
};
