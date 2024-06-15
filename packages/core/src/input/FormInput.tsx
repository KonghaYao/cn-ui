import { OriginComponent } from "@cn-ui/reactive";
import { BaseInput, type BaseInputProps } from "./index";

export const FormInput = OriginComponent<BaseInputProps, HTMLDivElement, string | null>((props) => {
    const model = props.model.sync(
        () => props.model()! ?? "",
        (i) => i ?? null,
    );
    return <BaseInput {...(props as any)} v-model={model} />;
});
