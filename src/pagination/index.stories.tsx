import type { Meta, StoryObj } from 'storybook-solidjs'

import { Pagination } from './index'
import { atom, usePagination } from '@cn-ui/reactive'

const meta = {
    title: 'Navigation 导航/Pagination 分页',
    component: Pagination,
    tags: ['autodocs'],
    argTypes: {}
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    render() {
        const pageSize = atom(10)
        const a = usePagination(async (num, max, count) => {
            console.log('请求', num)
            max(100)
            count(100)
            return []
        })
        return <Pagination {...a.toPaginationModel()} pageSize={pageSize()}></Pagination>
    },
    args: {}
}
