import type { Meta, StoryObj } from "storybook-solidjs";

import { NullAtom, atom } from "@cn-ui/reactive";
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
    args: {},
};
