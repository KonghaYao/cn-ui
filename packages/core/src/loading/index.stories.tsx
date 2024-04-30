import type { Meta, StoryObj } from "storybook-solidjs";

import { AC, DefineAC, ensureOnlyChild, resource, sleep } from "@cn-ui/reactive";
import { defineExampleAC } from "../lazyLoad/example/defineExampleAC";
import { Loading } from "./index";

const meta = {
    title: "Utils/Loading",
    component: Loading,
    argTypes: {},
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

defineExampleAC();
DefineAC({
    loading: (state, rendering) => {
        const child = ensureOnlyChild(() => rendering);
        return <Loading portalled target={child} />;
    },
});

import * as Spinners from "@cn-ui/svg-spinner";
import SpinnerNames from "@cn-ui/svg-spinner/dist/svg-spinner.exports.json";
import { expect, userEvent, within } from "@storybook/test";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Col, Row } from "../RowAndCol";
import { Button } from "../button";
/**  */
export const Primary: Story = {
    name: "Loading 加载组件",
    render() {
        const res = resource(() => new Promise((resolve) => {}));
        return (
            <Row gutter="8px">
                <For each={SpinnerNames as (keyof typeof Spinners)[]}>
                    {(item) => {
                        return (
                            <Col span={4}>
                                <AC
                                    resource={res}
                                    loading={(state, rendering) => {
                                        const child = ensureOnlyChild(() => rendering);
                                        return (
                                            <>
                                                <Loading portalled target={child}>
                                                    <Dynamic
                                                        component={Spinners[item]}
                                                        height="64"
                                                        width="64"
                                                        class="fill-primary-400 stroke-primary-400"
                                                    />
                                                </Loading>
                                            </>
                                        );
                                    }}
                                    fallback={() => {
                                        return <div class="h-32 w-full">{item}</div>;
                                    }}
                                >
                                    {() => <div class="h-32">129032</div>}
                                </AC>
                            </Col>
                        );
                    }}
                </For>
            </Row>
        );
    },
    args: {},
};

export const Floating: Story = {
    name: "Floating 浮动加载层",
    render() {
        const res = resource(() => sleep(1000, Math.random()), {
            initValue: Math.random(),
        });
        return (
            <div class="h-screen">
                <Button onclick={() => res.refetch()}>refetch</Button>
                {/*  keepLastState must render success */}
                <AC
                    resource={res}
                    keepLastState
                    loading={(state, rendering) => {
                        const child = ensureOnlyChild(() => rendering);
                        return <Loading portalled target={child} />;
                    }}
                >
                    {() => {
                        return (
                            <div data-testid="loading-target" class="h-96 w-96">
                                {res()}
                            </div>
                        );
                    }}
                </AC>
            </div>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        // 判断 loading 和 h-full 大小一致
        await step("判断 Loading 和 物体一致大小", async () => {
            await userEvent.click(canvas.getByRole("button"));
            const el = canvasElement.ownerDocument.querySelector(".cn-loading")!;
            console.log(el);
            const loading = getComputedStyle(el);
            await expect(loading.height).toBe("384px");
            await expect(loading.width).toBe("384px");
        });
    },
};
