import type { Meta, StoryObj } from "storybook-solidjs";

import { atom } from "@cn-ui/reactive";
import { createEffect } from "solid-js";
import { For } from "solid-js/web";
import { Alert } from "../Message";
import { Col, Row } from "../RowAndCol";
import { Button } from "../button";
import { CheckboxGroup } from "../checkbox";
import { Flex } from "../container/Flex";
import { Popover, type PopoverProps } from "./index";
const meta = {
    title: "Data 数据展示/Popover 弹出层",
    component: Popover,
    argTypes: {},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render() {
        const positions = [
            "top-start",
            "top",
            "top-end",
            "bottom",
            "right",
            "left",
            "bottom-start",
            "bottom-end",
            "right-start",
            "right-end",
            "left-start",
            "left-end",
        ] as const;
        const trigger = atom(["click"]);
        return (
            <Row gutter={20}>
                <Col span={24}>
                    <Flex gap={"12px"}>
                        <CheckboxGroup
                            options={["click", "hover", "focus"].map((i) => ({
                                label: i,
                                value: i,
                            }))}
                            v-model={trigger}
                            multiple={false}
                        />
                    </Flex>
                </Col>

                <For each={positions}>
                    {(position) => {
                        const open = atom(false);
                        return (
                            <Col span={6} class="h-48 py-4">
                                <Flex class="h-full bg-gray-100">
                                    <Popover
                                        content={<div>{position}</div>}
                                        v-model={open}
                                        placement={position}
                                        trigger={trigger()[0] as PopoverProps["trigger"]}
                                    >
                                        <Button>{position}</Button>
                                    </Popover>
                                </Flex>
                            </Col>
                        );
                    }}
                </For>
            </Row>
        );
    },
    args: {},
};

export const Tooltips: Story = {
    render() {
        const show = atom(false);
        createEffect(() => console.log(show()));
        return (
            <Flex class="h-full bg-gray-100">
                <Popover
                    sameWidth
                    v-model={show}
                    content={"12321323"}
                    trigger={"hover"}
                    clickOutsideClose={false}
                >
                    <Button>按钮</Button>
                </Popover>
                <Button
                    onclick={() =>
                        show((i) => {
                            console.log(1, !i);
                            return !i;
                        })
                    }
                >
                    按钮
                </Button>
            </Flex>
        );
    },
    args: {},
};
export const AppendMode: Story = {
    name: "附加模式",
    render() {
        const show = atom(true);
        createEffect(() => console.log(show()));
        return (
            <Flex class="h-96  bg-gradient-to-r from-cyan-500 to-blue-500">
                <Button id="my-btn">你不需要嵌套 JSX，而是使用 HTML 原生支持的选择器</Button>
                <Popover
                    popoverTarget="#my-btn"
                    sameWidth
                    v-model={show}
                    trigger="click"
                    content={(context) => {
                        const { model } = context!;
                        return (
                            <div class="flex flex-col">
                                <Alert round type="warning" message="是否要执行删除操作" />
                                <div class="flex justify-end">
                                    <Button onclick={() => model(false)}>取消</Button>
                                    <Button
                                        danger
                                        type="primary"
                                        onclick={() => {
                                            model(false);
                                        }}
                                    >
                                        确认
                                    </Button>
                                </div>
                            </div>
                        );
                    }}
                    clickOutsideClose={false}
                />
            </Flex>
        );
    },
    args: {},
};
