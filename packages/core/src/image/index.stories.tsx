import type { Meta, StoryObj } from "storybook-solidjs";

import { photos } from "../waterFall/example/photos";
import { Image } from "./index";
import { Alert } from "../Message";

const meta = {
    title: "Basic 基础组件/Image",
    component: Image,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        return <Image src={photos[0].src} alt="any" />;
    },
    args: {},
};

/** 暂时未进行测试 */
export const Responsive: Story = {
    name: "Responsive 响应式图片",
    render() {
        const images: [string, number][] = [
            [photos[0].src, 400],
            [photos[1].src, 500],
            [photos[2].src, 600],
        ];
        return (
            <>
                <Image src={photos[0].src} srcSets={images} alt="bea" />
            </>
        );
    },
    args: {},
};
export const Fallback: Story = {
    name: "Fallback 错误处理",
    render() {
        return (
            <>
                <Image src="3483483478" fallback={photos[0].src} alt="any" />
                <Image
                    src="3483483478"
                    fallback={<Alert message="image-error-fallback" />}
                    alt="any"
                />
            </>
        );
    },
    args: {},
};
