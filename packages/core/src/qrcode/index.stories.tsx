import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
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
        const url = atom("1234");
        return (
            <>
                <QRCode v-model={url}></QRCode>
                <BaseInput v-model={url}></BaseInput>
            </>
        );
    },
    args: {},
};
