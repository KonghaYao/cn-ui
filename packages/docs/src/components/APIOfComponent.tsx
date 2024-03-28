import { type ColumnDef, Checkbox } from '@cn-ui/core'
import { atom } from '@cn-ui/reactive'
interface DocAPIInfo {
    defaultValue: any
    description: string
    name: string
    declarations: {
        fileName: string
        name: string
    }[]
    required: boolean
    type: {
        name: string
    }
    tags: {}
}
export interface DocInfo {
    tags: {}
    filePath: string
    description: string
    displayName: string
    methods: Array<any>
    props: Record<string, DocAPIInfo>
}

const columns = [
    { accessorKey: 'name', header: () => '名称' },
    { accessorKey: 'required', header: () => '必填' },
    { accessorKey: 'description', header: () => '描述' }
] satisfies ColumnDef<DocAPIInfo>

export const APIOfComponent = (props: { comp?: { __docgenInfo: DocInfo }; doc?: DocInfo }) => {
    const doc = props?.comp?.__docgenInfo?.props ?? props.doc
    if (!doc) {
        return '未识别到组件'
    }
    const info = Object.values(doc.props)
    return (
        <div class=" p-4 rounded-xl">
            <table class="w-full ">
                <thead>
                    <tr>
                        <th class="w-8"></th>
                        <th class="text-left">名称</th>
                        <th class="text-left">描述</th>
                        <th class="text-left">类型</th>
                        <th class="text-left">默认</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((i) => {
                        const isChecked = atom(i.required)
                        return (
                            <tr>
                                <td>
                                    <Checkbox v-model={isChecked} value=""></Checkbox>
                                </td>
                                <td>{i.name}</td>
                                <td>{i.description}</td>
                                <td>{i.type.name}</td>
                                <td>{i.defaultValue}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
