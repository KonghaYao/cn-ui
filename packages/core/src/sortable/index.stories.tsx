import type { Meta, StoryObj } from 'storybook-solidjs'

import { SortableList, SortableShared } from './index'
import { atom, computed, resource } from '@cn-ui/reactive'
import Mock from 'mockjs-ts'
import { Flex } from '../container'

const meta = {
    title: 'Layout 布局组件/Sortable 拖拽排序',
    component: SortableList,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof SortableList>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const data = atom([
            {
                id: '223232',
                label: 'info'
            },
            {
                id: '111',
                label: 'info1'
            },
            {
                id: '222',
                label: 'info2'
            }
        ])
        return (
            <SortableList
                v-model={data}
                getId={(item) => {
                    return item['label']
                }}
            >
                {(item) => {
                    return <button>{item.label}</button>
                }}
            </SortableList>
        )
    },
    args: {}
}
export const Sortable: Story = {
    render() {
        const data = resource<{ data: { id: string; label: string }[] }>(
            async () =>
                Mock.mock({
                    'data|10': [
                        {
                            id: '@id',
                            label: '@cname'
                        }
                    ]
                }),
            { initValue: { data: [] } }
        )
        const modelLeft = computed(() => data().data.slice(0, 5))
        const modelRight = computed(() => data().data.slice(5))
        return (
            <>
                <Flex>
                    <SortableShared.Provider value={{ sharedData: [modelLeft, modelRight] }}>
                        <SortableList
                            v-model={modelLeft}
                            options={{
                                group: 'common'
                            }}
                        >
                            {(item) => {
                                return <div>{item.label}</div>
                            }}
                        </SortableList>
                        <SortableList
                            v-model={modelRight}
                            options={{
                                group: 'common'
                            }}
                        >
                            {(item) => {
                                return <div>{item.label}</div>
                            }}
                        </SortableList>
                    </SortableShared.Provider>
                </Flex>
                <Flex vertical>
                    <button onclick={() => data.refetch()}>重置</button>
                    <div>{JSON.stringify(modelLeft().map((i) => i.label))}</div>
                    <div>{JSON.stringify(modelRight().map((i) => i.label))}</div>
                </Flex>
            </>
        )
    },
    args: {}
}
