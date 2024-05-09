import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { Flex } from "../container";
import { BaseInput } from "../input";
import { QRCode } from "./index";

const meta = {
    title: "Navigation 导航/QRCode 分页",
    component: QRCode,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof QRCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        const url = atom("https://chinese-font.netlify.app");
        return (
            <>
                <Flex>
                    {(["M", "L", "Q", "H"] as const).map((i) => {
                        return <QRCode v-model={url} correction={i}></QRCode>;
                    })}
                </Flex>
                <BaseInput v-model={url}></BaseInput>
            </>
        );
    },
    parameters: {
        virtualTest: true,
    },
};
