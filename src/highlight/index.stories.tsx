import type { Meta, StoryObj } from 'storybook-solidjs';

import { Code } from './index';

const meta = {
    title: 'Article/Code',
    component: Code,
    tags: ['autodocs'],
    argTypes: {},
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

import SampleCode from './Code?raw';
export const Primary: Story = {
    render() {
        return <Code code={SampleCode} lang="tsx"></Code>;
    },
    args: {},
};
