import { createBlackBoard } from "@cn-ui/reactive";
import type { DialogExpose } from "../dialog";

export const GlobalDialog = (() => {
    const item = createBlackBoard<Record<string, DialogExpose>>({
        allowSameRegister: false,
        autoCleanUp: true,
    });
    return {
        ...item,
        toggle(id: string, val?: boolean) {
            return item.getApp(id)?.toggle(val);
        },
    };
})();
