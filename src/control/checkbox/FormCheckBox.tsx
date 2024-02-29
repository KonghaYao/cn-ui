import { NullAtom, OriginComponent } from '@cn-ui/reactive'
import { CheckboxGroup, CheckboxGroupExpose, useControlCheckbox } from './CheckboxGroup'
import { Checkbox, CheckboxProps } from './Checkbox'

export const FormCheckBox = OriginComponent<{ options: CheckboxProps[] }, HTMLDivElement, string[] | null>((props) => {
    const model = props.model.reflux(props.model() ?? [], (i) => (i.length ? i : null))
    const checkBoxCtx = NullAtom<CheckboxGroupExpose>(null)
    const { indeterminate, isAllChecked, onChange } = useControlCheckbox(checkBoxCtx)
    return (
        <>
            <Checkbox indeterminate={indeterminate()} v-model={isAllChecked} label={''} value={''} onChange={onChange}></Checkbox>
            <CheckboxGroup options={props.options} v-model={model} expose={checkBoxCtx}></CheckboxGroup>
        </>
    )
})
