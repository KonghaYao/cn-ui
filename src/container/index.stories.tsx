import type { Meta, StoryObj } from 'storybook-solidjs'

import { Container } from './index'
import { Main, Header, Aside, Footer, Center } from './container'

const meta = {
    title: 'Basic 基础组件/Container 预设布局',
    component: Container,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        return (
            <div class="h-24">
                <Container direction="row">
                    <Aside class="bg-green-200 w-64">
                        <Center>Aside</Center>
                    </Aside>
                    <Container direction="col">
                        <Header class="bg-green-300">
                            <Center>Header </Center>
                        </Header>
                        <Main class="bg-green-100">
                            <Center>Main </Center>
                        </Main>
                        <Footer class="bg-green-300">
                            <Center>Footer </Center>
                        </Footer>
                    </Container>
                </Container>
            </div>
        )
    },
    args: {}
}
