import { DefineAC } from '@cn-ui/reactive'

export const defineExampleAC = () => {
    DefineAC({
        loading: () => <div class="h-32 w-32 flex justify-center items-center bg-yellow-600">加载中</div>,
        error: () => <div class="h-32 w-32 flex justify-center items-center bg-rose-600">加载失败</div>,
        fallback: () => <div class="h-32 w-32 flex justify-center items-center bg-purple-600">未加载</div>
    })
}
