import { onCleanup } from 'solid-js'
import { DialogExpose } from './Dialog'

const DialogIDRegister = new Map<string, DialogExpose>()
/** 可以无视作用域使用的 Dialog 控制中心 */
export const GlobalDialog = () => {
    return {
        register(id: string, expose: DialogExpose) {
            DialogIDRegister.set(id, expose)
            onCleanup(() => {
                DialogIDRegister.delete(id)
            })
        },
        toggle(id: string, val?: boolean) {
            return DialogIDRegister.get(id)?.toggle(val)
        }
    }
}
