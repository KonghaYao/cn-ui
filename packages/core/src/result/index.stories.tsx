import type { Meta, StoryObj } from "storybook-solidjs";
import { Flex } from "../container";
import { Empty } from "./Empty/Empty";
import { ResultAlert } from "./index";

const meta = {
    title: "Utils/Result",
    component: ResultAlert,
} satisfies Meta<typeof ResultAlert>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: () => {
        return (
            <Flex>
                {(["success", "info", "error", "warning"] as const).map((i) => {
                    return (
                        <ResultAlert
                            class="flex-1"
                            title={i}
                            subTitle={i + ".description"}
                            type={i}
                        ></ResultAlert>
                    );
                })}
            </Flex>
        );
    },
    parameters: {
        virtualTest: true,
    },
    play() {},
};
export const EmptyExample: Story = {
    render: () => {
        return (
            <Flex>
                <Empty class="flex-1" title={"No Data"}></Empty>
            </Flex>
        );
    },
    parameters: {
        virtualTest: true,
    },
    play() {},
};
