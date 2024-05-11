import type { Meta, StoryObj } from "storybook-solidjs";

import { NullAtom, atom } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { Button } from "../button";
import { Timeline, type TimelineExpose } from "./index";

const meta = {
    title: "Layout 布局组件/Timeline 拖拽区域",
    component: Timeline,
    argTypes: {},
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 自动实现子代元素分割的组建 */
export const Primary: Story = {
    render: () => {
        const options = [
            { label: "first djfisdjfldjsifjdifjsdijfidjfidji" },
            { label: "second" },
            { label: "third" },
        ];
        const model = atom(options[1]);
        const pending = atom(false);
        const Expose = NullAtom<TimelineExpose>(null);
        return (
            <>
                <Timeline options={options} expose={Expose} pending={pending} v-model={model} />
                <div>
                    <Button
                        onclick={() => {
                            Expose()?.goToPrevious();
                        }}
                    >
                        Prev
                    </Button>
                    <Button
                        onclick={() => {
                            pending((i) => !i);
                        }}
                    >
                        Toggle Pending
                    </Button>
                    <Button
                        onclick={() => {
                            Expose()!.goToNext();
                        }}
                    >
                        Next
                    </Button>
                </div>
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const checkCurrentIndex = (index: string) => {
            //aria-current step data-index 为 1
            const items = canvasElement.querySelectorAll("li");
            const current = [...items].filter((i) => i.hasAttribute("aria-current"));
            expect(current.length).toBe(1);
            expect(current[0]).toHaveAttribute("data-index", index);
        };
        await step("检查初始状态", () => {
            checkCurrentIndex("1");
        });
        await step("检查前后状态", async () => {
            await userEvent.click(canvas.getByRole("button", { name: "Prev" }));
            checkCurrentIndex("0");
            await userEvent.click(canvas.getByRole("button", { name: "Next" }));
            checkCurrentIndex("1");
            await userEvent.click(canvas.getByRole("button", { name: "Next" }));
            checkCurrentIndex("2");
        });
        await step("检查 pending 状态", async () => {
            expect(canvas.queryByLabelText("loading icon")).not.toBeInTheDocument();
            await userEvent.click(canvas.getByRole("button", { name: "Toggle Pending" }));
            expect(canvas.queryByLabelText("loading icon")).toBeInTheDocument();
            await userEvent.click(canvas.getByRole("button", { name: "Toggle Pending" }));
            expect(canvas.queryByLabelText("loading icon")).not.toBeInTheDocument();
        });
    },
};
