import { Atom, OriginComponent, computed, createCtx, extendsEvent, useSelect } from '@cn-ui/reactive'
import { atom } from '@cn-ui/reactive'
import { For } from 'solid-js'

export type CheckboxGroupCtxType = ReturnType<typeof useSelect> & {}
export const CheckboxGroupCtx = createCtx<CheckboxGroupCtxType>({} as any)

export interface CheckboxProps {
    label: string
    value: string
    disabled?: boolean
    indeterminate?: boolean
}
export const Checkbox = OriginComponent<CheckboxProps, HTMLInputElement, boolean>((props) => {
    const group = CheckboxGroupCtx.use()
    group?.register?.(props.value)
    return (
        <label class="select-none">
            <input
                // @ts-ignore
                indeterminate={props.indeterminate}
                disabled={props.disabled}
                type="checkbox"
                checked={group?.isSelected?.(props.value) ?? props.model()}
                {...extendsEvent(props)}
                oninput={(e) => {
                    group?.changeSelected?.(props.value, e.target.checked)
                    props.model(e.target.checked)
                }}
            />
            {props.label}
        </label>
    )
})

export interface CheckboxGroupExpose extends ReturnType<typeof useSelect> {}
interface CheckboxGroupProps {
    options: (string | number | CheckboxProps)[]
    expose?: (expose: CheckboxGroupExpose) => void
    multiple?: boolean
}

export const CheckboxGroup = OriginComponent<CheckboxGroupProps, HTMLElement, string[]>((props) => {
    props.model([])
    const selectSetting = useSelect({
        activeIds: props.model,
        multi: props.multiple ?? true
    })
    const options = computed(() => {
        if (typeof props.options[0] === 'object') {
            return props.options as CheckboxProps[]
        } else {
            return props.options.map((i) => ({ value: i.toString(), label: i.toString() }))
        }
    })
    props.expose?.(selectSetting)
    return (
        <CheckboxGroupCtx.Provider
            value={{
                ...selectSetting
            }}
        >
            <For each={options()}>
                {(config) => {
                    return <Checkbox {...config}></Checkbox>
                }}
            </For>
        </CheckboxGroupCtx.Provider>
    )
})

/** 全选不选按钮的 hook */
export const useControlCheckbox = (checkBoxCtx: Atom<CheckboxGroupExpose | null>) => {
    const isAllChecked = computed(() => checkBoxCtx()?.isAllSelected() ?? false)
    return {
        isAllChecked,
        indeterminate: computed(() => checkBoxCtx()?.isIndeterminate()),
        onChange() {
            const val = checkBoxCtx()?.isAllSelected()
            if (val || checkBoxCtx()?.isIndeterminate()) {
                return checkBoxCtx()?.clearAll()
            } else {
                return checkBoxCtx()?.selectAll()
            }
        }
    }
}
