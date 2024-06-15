import { OriginComponent } from "@cn-ui/reactive";
import { Flex } from "../container";
import { CheckboxGroup, type CheckboxGroupProps } from "./CheckboxGroup";

export const FormRadio = OriginComponent<CheckboxGroupProps, HTMLDivElement, string | null>(
    (props) => {
        const model = props.model.sync(
            () => (props.model() ? [props.model()!] : ([] as string[])),
            (i) => (i ? i[0] : null),
        );
        return (
            <Flex justify="start" class="gap-4">
                <CheckboxGroup {...(props as any)} v-model={model} multiple={false} />
            </Flex>
        );
    },
);
