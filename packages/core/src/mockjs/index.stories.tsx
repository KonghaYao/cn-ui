import type { Meta, StoryObj } from 'storybook-solidjs'
import { JSON2Mockjs, JSON2TypeAlias } from 'mock-type/src/index'
import { Container, Flex, Header, Main } from '../container'
import { atom, computed } from '@cn-ui/reactive'
import { Col, Row } from '../RowAndCol'
import { Tabs } from '../tabs/Tabs'
import { Tab } from '../tabs/Tab'
import Mock from 'mockjs-ts'
import { AiOutlineCopy } from 'solid-icons/ai'
import { Icon } from '../icon/Icon'
import * as copy from 'copy-to-clipboard'

const meta = {
    title: 'Utils 工具/Mockjs 转换工具',
    component() {},
    argTypes: {}
} satisfies Meta<unknown>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const input = atom('')
        const output = atom<Record<string, any>>({
            root: {}
        })
        const transform = () => {
            output(JSON2Mockjs(JSON.parse(input())))
        }
        const mocked = computed<{ root: unknown }>(() => {
            try {
                return Mock.mock(output())
            } catch (e) {
                return { root: '' }
            }
        })
        const mockedType = computed(() => {
            if (input()) return JSON2TypeAlias(JSON.parse(input()))
            return ''
        })
        return (
            <Container class="h-screen">
                <Header>
                    <Flex vertical>
                        <button onclick={transform}>Mockjs 转换</button>
                    </Flex>
                </Header>
                <Main>
                    <Row class="h-full">
                        <Col span={12}>
                            <div class="h-10">Input JSON</div>
                            <textarea class="w-full h-full bg-gray-100" value={input()} oninput={(i) => input(i.target.value)}></textarea>
                        </Col>
                        <Col span={12}>
                            <Tabs v-model={atom('Mockjs')} fill>
                                <Tab name="Mockjs" class="flex gap-2">
                                    <EditPanel title="Types Alias" value={mockedType()}></EditPanel>
                                    <EditPanel title="Mockjs Template" value={JSON.stringify(output().root, null, 4)}></EditPanel>
                                </Tab>
                                <Tab name="Result">
                                    <EditPanel title="JSON Result" value={JSON.stringify(mocked().root, null, 4)}></EditPanel>
                                </Tab>
                            </Tabs>
                        </Col>
                    </Row>
                </Main>
            </Container>
        )
    },
    args: {}
}
const EditPanel = (props: { title: string; value: string }) => {
    return (
        <Flex vertical wrap="nowrap" class="flex-1">
            <h3>
                {props.title}
                <Icon onclick={() => copy(props.value)}>
                    <AiOutlineCopy></AiOutlineCopy>
                </Icon>
            </h3>
            <textarea class=" p-1 rounded-md w-full h-full bg-gray-100" value={props.value}></textarea>
        </Flex>
    )
}
