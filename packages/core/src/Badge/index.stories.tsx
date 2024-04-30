import type { Meta, StoryObj } from "storybook-solidjs";

import { NullAtom, atom } from "@cn-ui/reactive";
import { expect, userEvent, within } from "@storybook/test";
import { sleep } from "radash";
import { InputNumber } from "../inputNumber";
import { Badge } from "./index";

const meta = {
    title: "Utils/Badge",
    component: Badge,
    argTypes: {},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
    render: () => {
        const btn = NullAtom<HTMLButtonElement>(null);
        const count = atom(10);

        return (
            <>
                {/* Badge 的三种状态 */}
                <InputNumber ref={btn} v-model={count} />
                <Badge target={btn} count={count() ?? 0} />
            </>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const typeInput = async (input: HTMLInputElement, value: string) => {
            await userEvent.clear(input);
            await userEvent.type(input, value);
            input.blur();
            return await sleep(50);
        };
        await step("更换数字", async () => {
            const badge = canvasElement.querySelector(".cn-badge");
            const input = canvasElement.querySelector("input")!;
            expect(badge).toHaveTextContent("10");

            await typeInput(input, "0");
            expect(badge).toHaveTextContent("");

            await typeInput(input, "1");
            expect(badge).toHaveTextContent("1");

            await typeInput(input, "100");
            expect(badge).toHaveTextContent("99+");
        });
    },
};
