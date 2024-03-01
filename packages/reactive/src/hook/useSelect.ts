import { atomization } from '../utils'
import { ArrayAtom, atom, Atom, SetAtom } from '../atom/index'
import { createEffect } from 'solid-js'

/**
 * @zh 多选状态管理
 * */
export const useSelect = function (
    props: {
        activeIds?: Atom<string[]>
        /** 默认多选，但是可以取消 */
        multi?: Atom<boolean> | boolean
    } = {}
) {
    const activeIdsArray = ArrayAtom(props.activeIds ?? atom<string[]>([]))

    const multi = atomization(props.multi ?? true)
    const activeIdsSet = SetAtom(activeIdsArray())

    const disabledSet = SetAtom<string>([])

    // 自动强制单选，防止上流 activeIds 强制多选的行为
    createEffect(() => {
        !multi() && activeIdsArray((i) => i.slice(0, 1))
        activeIdsSet(() => new Set(activeIdsArray()))
    })

    /** 曾注册过的状态 */
    const allRegistered = atom(new Set<string>(), { equals: false })

    /** 更改相应 id 的状态 */
    const changeSelected = (id: string, state?: boolean) => {
        if (disabledSet().has(id)) return false
        // 默认自动置反
        if (state === undefined) state = !activeIdsSet().has(id)

        if (state === true && !activeIdsSet().has(id)) {
            activeIdsArray((i) => {
                if (multi()) {
                    return [...i, id]
                } else {
                    return [id]
                }
            })
        } else if (state === false) {
            activeIdsArray.removeAll(id)
        }
        return state
    }
    return {
        multi,
        activeIdsArray,
        /** 更改状态 */
        changeSelected,
        /** 清空选中 */
        clearAll() {
            activeIdsArray([])
        },
        /** 选中所有 */
        selectAll() {
            if (multi()) {
                activeIdsArray([...allRegistered()])
            } else {
                throw new Error('单选不能进行全选')
            }
        },
        /** 注册键，可以在任何时候进行注册 */
        register(id: string, state = false) {
            allRegistered((i) => {
                i.add(id)
                return i
            })
            changeSelected(id, state)
        },
        /** 所有选中 */
        isAllSelected() {
            return allRegistered().size === activeIdsSet().size
        },
        /** 是否选中有 */
        isIndeterminate() {
            return allRegistered().size !== activeIdsSet().size && activeIdsSet().size > 0
        },
        /** 取消整个键的采用 */
        deregister(id: string) {
            activeIdsArray.removeAll(id)
            allRegistered((i) => (i.delete(id), i))
        },
        /** 所有注册过的键 */
        allRegistered,
        /** 被选中的键的 Set Atom */
        activeIds: activeIdsSet,
        /** 检查一个键是否被选中 */
        isSelected: (id: string) => {
            return activeIdsSet().has(id)
        },
        /** 禁用 */
        disabledSet
    }
}
