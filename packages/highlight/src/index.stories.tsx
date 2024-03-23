import type { Meta, StoryObj } from 'storybook-solidjs'

import { Code, useCodeStyle } from './index'

const meta = {
    title: 'Article/Code',
    component: Code,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Code>

export default meta
type Story = StoryObj<typeof meta>

import SampleCode from './Code?raw'
export const Primary: Story = {
    render() {
        const { link } = useCodeStyle('a11y-dark')
        return (
            <>
                <Code code={SampleCode} lang="tsx"></Code>
                {link}
            </>
        )
    },
    args: {}
}
