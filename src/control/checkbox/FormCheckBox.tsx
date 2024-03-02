import { NullAtom, OriginComponent } from '@cn-ui/reactive'
import { CheckboxGroup, CheckboxGroupExpose, CheckboxGroupProps } from './CheckboxGroup'
import { Flex } from '../../container'

export const FormCheckBox = OriginComponent<CheckboxGroupProps, HTMLDivElement, string[] | null>((props) => {
    const model = props.model.reflux(props.model() ?? [], (i) => (i.length ? i : null))
    const checkBoxCtx = NullAtom<CheckboxGroupExpose>(null)
    // const { indeterminate, isAllChecked, onChange } = useControlCheckbox(checkBoxCtx)
    return (
        <Flex justify="start" class="gap-4">
            <CheckboxGroup {...(props as any)} v-model={model} expose={checkBoxCtx}></CheckboxGroup>
        </Flex>
    )
})
