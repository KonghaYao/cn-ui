import { useMapper } from "@cn-ui/reactive";
import type { ButtonProps } from "../Button";

export function createTypeClass(props: Partial<Pick<ButtonProps, "type" | "danger">>) {
    return useMapper(() => props.type ?? "default", {
        primary: () => {
            const danger = props.danger
                ? "bg-error-500 hover:bg-error-400"
                : "bg-primary-500 hover:bg-primary-400";
            return `${danger} text-white `;
        },
        dashed() {
            return `${this.default()} border-dashed`;
        },
        link() {
            const danger = props.danger ? "text-error-500" : "text-primary-500";
            return `${this.default()} border-none ${danger}`;
        },
        text() {
            return "hover:bg-gray-200";
        },
        default: () => {
            const danger = props.danger
                ? "hover:border-error-400 hover:text-error-400 active:bg-error-50"
                : "hover:border-primary-400 hover:text-primary-400  active:bg-primary-50";
            return `border-design-separator border ${danger} bg-transparent`;
        },
    });
}
