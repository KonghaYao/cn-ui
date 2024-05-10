import type { Meta, StoryObj } from "storybook-solidjs";

import { Timeline } from "./index";

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
        return <Timeline options={options}></Timeline>;
    },
    args: {},
};
