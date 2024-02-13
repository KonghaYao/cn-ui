import { OriginComponent, computed, createCtx, extendsEvent, useMapper, useSelect } from '@cn-ui/reactive'

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
    group?.register?.(props.value, group.activeIds().has(props.value))

    const inputType = computed(() => (group?.multi?.() === false ? 'radio' : 'checkbox'))
    const isChecked = computed(() => group?.isSelected?.(props.value) ?? props.model())
    const inputClass = useMapper(inputType, {
        radio: ['rounded-full border-4 border-design-border', 'rounded-full border-4 border-primary-500'],
        checkbox: ['rounded-md border-2', 'rounded-md border-2 bg-primary-500 border-primary-200']
    })
    return (
        <label class="select-none cursor-pointer">
            <input
                class={props.class(
                    inputClass()[isChecked() ? 1 : 0],
                    'appearance-none transition w-5 h-5 mr-2 translate-y-[3px]',
                    props.indeterminate && 'border-blue-600'
                )}
                // @ts-ignore
                indeterminate={props.indeterminate}
                disabled={props.disabled}
                type={inputType()}
                checked={isChecked()}
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
