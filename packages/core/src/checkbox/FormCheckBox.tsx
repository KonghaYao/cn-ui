import { NullAtom, OriginComponent } from "@cn-ui/reactive";
import { Flex } from "../container";
import { CheckboxGroup, type CheckboxGroupExpose, type CheckboxGroupProps } from "./CheckboxGroup";

export const FormCheckBox = OriginComponent<CheckboxGroupProps, HTMLDivElement, string[] | null>(
    (props) => {
        const model = props.model.sync(
            () => props.model() ?? [],
            (i) => (i.length ? i : null),
        );
        const checkBoxCtx = NullAtom<CheckboxGroupExpose>(null);
        // const { indeterminate, isAllChecked, onChange } = useControlCheckbox(checkBoxCtx)
        return (
            <Flex justify="start" class="gap-4">
                <CheckboxGroup {...(props as any)} v-model={model} expose={checkBoxCtx} />
            </Flex>
        );
    },
);
