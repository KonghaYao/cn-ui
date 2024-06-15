import { OriginComponent } from "@cn-ui/reactive";

import type { CommonGroupListConfig } from "../groupList";
import { Cascader, type CascaderProps } from "./index";

export const FormCascader = OriginComponent<
    CascaderProps,
    HTMLDivElement,
    CommonGroupListConfig[] | null
>((props) => {
    const model = props.model.sync(
        () => props.model() ?? [],
        (i) => i,
    );

    return <Cascader {...(props as any)} v-model={model} />;
});
