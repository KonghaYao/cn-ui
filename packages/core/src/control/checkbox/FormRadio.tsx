import { OriginComponent } from '@cn-ui/reactive'
import { CheckboxGroup, CheckboxGroupProps } from './CheckboxGroup'
import { Flex } from '../../container'

export const FormRadio = OriginComponent<CheckboxGroupProps, HTMLDivElement, string | null>((props) => {
    const model = props.model.reflux(props.model() ? [props.model()!] : ([] as string[]), (i) => (i ? i[0] : null))
    return (
        <Flex justify="start" class="gap-4">
            <CheckboxGroup {...(props as any)} v-model={model} multiple={false}></CheckboxGroup>
        </Flex>
    )
})
