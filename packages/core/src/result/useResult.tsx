import { useMapper } from "@cn-ui/reactive";
import {
    AiFillCheckCircle,
    AiFillCloseCircle,
    AiFillInfoCircle,
    AiFillWarning,
    AiOutlineAlert,
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineInfo,
} from "solid-icons/ai";
import { Icon } from "../icon";

export interface useResultProps {
    type?: "success" | "info" | "warning" | "error";
}
export const useResultState = (props: useResultProps) => {
    const classMapper = useMapper(props.type ?? "default", {
        success() {
            return {
                text: "text-green-600",
                bg: "bg-green-400",
                subBg: "bg-green-100",
            };
        },
        info() {
            return {
                text: "text-blue-600",
                bg: "bg-blue-400",
                subBg: "bg-blue-100",
            };
        },
        warning() {
            return {
                text: "text-yellow-600",
                bg: "bg-yellow-400",
                subBg: "bg-yellow-100",
            };
        },
        error() {
            return {
                text: "text-red-600",
                bg: "bg-red-400",
                subBg: "bg-red-100",
            };
        },
        default() {
            return {
                text: "",
                bg: "",
                subBg: "",
            };
        },
    });
    return { classMapper };
};
export const useResultIcon = (props: useResultProps) => {
    const commonProps = { size: "50%" };
    const iconMapper = useMapper(props.type ?? "default", {
        success() {
            return <AiOutlineCheck {...commonProps} />;
        },
        info() {
            return <AiOutlineInfo {...commonProps} />;
        },
        warning() {
            return <AiOutlineAlert {...commonProps} />;
        },
        error() {
            return <AiOutlineClose {...commonProps} />;
        },
        default() {
            return null;
        },
    });
    return { iconMapper };
};
