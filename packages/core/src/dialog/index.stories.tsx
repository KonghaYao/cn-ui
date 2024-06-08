import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { AiOutlineClose } from "solid-icons/ai";
import { createEffect } from "solid-js";
import { Button } from "../button";
import { Container, Flex, Header, Main } from "../container";
import { Icon } from "../icon/Icon";
import { Dialog, GlobalDialog } from "./index";

const meta = {
    title: "Feedback 反馈组件/Dialog 模态框",
    component: Dialog,
    argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        const data = atom<{ name: string; id: string }[]>([], { equals: false });
        createEffect(() => {
            console.log(data());
        });
        return (
            <>
                <Flex>
                    <Button class="flex-1" onclick={() => GlobalDialog.toggle("info-dialog")}>
                        触发
                    </Button>
                </Flex>
                <Dialog
                    id="info-dialog"
                    class="w-80 h-80 bg-design-card shadow-2xl"
                    v-model={atom(true)}
                >
                    <Container class="h-full">
                        <Header class="h-12 font-bold flex items-center justify-between border-b border-gray-300">
                            <span>Dialog</span>
                            <Icon
                                class="cursor-pointer"
                                onclick={() => GlobalDialog.toggle("info-dialog", false)}
                            >
                                <AiOutlineClose />
                            </Icon>
                        </Header>
                        <Main />
                    </Container>
                </Dialog>
            </>
        );
    },
    args: {},
};
