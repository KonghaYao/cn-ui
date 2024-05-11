import { ComponentSlots } from "@cn-ui/reactive";
import { AiOutlineLoading3Quarters } from "solid-icons/ai";
import "../animation/spin.css";
import { Icon } from "../icon/Icon";

export const GlobalButtonSlots = new ComponentSlots("Button", {
    loadingIcon: () => {
        return (
            <Icon class="pr-1" aria-label="loading icon">
                <AiOutlineLoading3Quarters class=" cn-animate-spin" />
            </Icon>
        );
    },
});
