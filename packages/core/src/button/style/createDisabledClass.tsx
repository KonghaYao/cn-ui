import { useMapper } from "@cn-ui/reactive";
import type { ButtonProps } from "../Button";

export function createDisabledClass(props: Partial<Pick<ButtonProps, "type" | "danger">>) {
    const common = "opacity-50";
    return useMapper(() => props.type ?? "default", {
        primary() {
            return `${common}`;
        },
        dashed() {
            return `${this.default()}  border-dashed`;
        },
        link() {
            const danger = props.danger ? "text-error-500" : "text-primary-500";
            return `${this.default()} border-none ${danger}`;
        },
        text() {
            return this.link();
        },
        default: () => {
            return `border cursor-not-allowed ${common}`;
        },
    });
}
