import type { Meta, StoryObj } from 'storybook-solidjs';

import { Image } from './index';
import { photos } from '../waterFall/example/photos';

const meta = {
    title: 'Basic 基础组件/Image',
    component: Image,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        return <Image src={photos[0].src}></Image>;
    },
    args: {},
};
