import { OriginComponent, ensureArrayReturn } from "@cn-ui/reactive";

import { Select, type SelectProps } from "./Select";

export const FormSelect = OriginComponent<SelectProps, HTMLDivElement, string[] | string | null>(
    (props) => {
        const model = props.model.sync(
            () => ensureArrayReturn(props.model() ?? []),
            (i) => (props.multiple ? ensureArrayReturn(i) : Array.isArray(i) ? i[0] : i),
        );

        return <Select {...(props as any)} v-model={model} />;
    },
);
