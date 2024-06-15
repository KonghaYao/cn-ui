import { OriginComponent } from "@cn-ui/reactive";
import { SwitchBtn, type SwitchBtnProps } from "./Switch";

export const FormSwitch = OriginComponent<SwitchBtnProps, HTMLInputElement, boolean | null>(
    (props) => {
        const model = props.model.sync(
            () => !!props.model(),
            (i) => !!i,
        );
        return <SwitchBtn {...(props as any)} v-model={model} />;
    },
);
