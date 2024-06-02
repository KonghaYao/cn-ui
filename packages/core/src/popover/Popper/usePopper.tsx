import { type Atom, atom } from "@cn-ui/reactive";
import type { Instance } from "@popperjs/core/lib/popper-lite";
import { createMemo, onCleanup, onMount } from "solid-js";
import type { PopoverProps } from "../Popper";
import { createPopper } from "./createPopper";

/** 对于 Popper js 的封装 */
export function usePopper(
    target: Atom<HTMLElement>,
    popoverContent: Atom<HTMLElement | null>,
    arrow: Atom<HTMLElement | null>,
    getOptions: () => Partial<PopoverProps>,
) {
    const mounted = atom(false);
    const recreatePopover = (instance?: Instance) => {
        if (instance) instance.destroy();
        if (!mounted()) return instance;
        if (getOptions().popoverTarget) {
            const popoverTarget = getOptions().popoverTarget!;
            const el = (
                typeof popoverTarget === "string"
                    ? document.querySelector(popoverTarget)!
                    : popoverTarget
            ) as HTMLElement;
            if (el) {
                target(el);
            } else {
                throw new Error(`Popover | can't find element ${popoverTarget}`);
            }
        }
        // console.log('init', target())
        return createPopper(target() as Element, popoverContent() as HTMLElement, {
            ...getOptions(),
            modifiers: [
                {
                    name: "arrow",
                    options: {
                        element: arrow(),
                        padding: 20,
                    },
                },
                {
                    name: "offset",
                    options: {
                        offset: [0, 10],
                    },
                },
                { name: "sameWidth", enabled: !!getOptions().sameWidth },
            ],
        });
    };
    const instance = createMemo(recreatePopover);
    onMount(() => {
        mounted(true);
        recreatePopover(undefined);
    });
    onCleanup(() => instance()?.destroy());
    return {
        /** update position */
        updatePosition() {
            instance()?.update();
        },
    };
}
