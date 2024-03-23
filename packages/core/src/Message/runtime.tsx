import { JSX } from 'solid-js'
import { render } from 'solid-js/web'

/** 全局创建一个子组件用于 Message、Notice 等组件的渲染 */
export const createRuntimeArea = (id: string, Comp: () => JSX.Element) => {
    const item = document.getElementById(id)
    if (item) {
        item.innerHTML = ''
        return render(Comp, item)
    }
    const runtimeArea = document.createElement('div')
    runtimeArea.id = id
    document.body.appendChild(runtimeArea)
    return render(Comp, runtimeArea)
}
