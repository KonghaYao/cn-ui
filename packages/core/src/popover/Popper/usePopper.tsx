import type { Atom } from "@cn-ui/reactive";
import { useLazyMount } from "@cn-ui/reactive";
import type { Instance } from "@popperjs/core/lib/popper-lite";
import { type Accessor, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";
import { nextTick } from "solidjs-use";
import type { PopoverProps } from "../Popper";
import { createPopper } from "./createPopper";

/** 对于 Popper js 的封装 */
export function usePopper(
    target: Atom<HTMLElement>,
    popoverContent: Atom<HTMLElement | null>,
    arrow: Atom<HTMLElement | null>,
    getOptions: () => Partial<PopoverProps>,
    isLazyReady: Accessor<boolean>,
    events: {
        beforeMount: () => void;
        mounted: () => void;
    },
) {
    let popperInstance: Instance;
    /** init 事件需要延迟执行，避免 DOM 未渲染的现象 */
    const init = () => {
        if (isServer) return;
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
        popperInstance = createPopper(target() as Element, popoverContent() as HTMLElement, {
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
            ],
        });
    };
    useLazyMount(
        () => {
            events.beforeMount();
            nextTick(init);
            events.mounted();
        },
        isLazyReady,
        { onMountInit: !getOptions().lazy },
    );

    const updatingOptions = () => {
        return [{ name: "sameWidth", enabled: !!getOptions().sameWidth }];
    };
    function show() {
        if (!popperInstance) return;
        if (getOptions().disabled) return;

        // Enable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers as any[]),
                ...updatingOptions(),
                { name: "eventListeners", enabled: true },
            ],
        }));

        // Update its position
        popperInstance.update();
    }

    function hide() {
        if (!popperInstance) return;
        if (getOptions().disabled) return;

        // Disable the event listeners
        popperInstance.setOptions((options) => ({
            ...options,
            modifiers: [
                ...(options.modifiers as any[]),
                ...updatingOptions(),
                { name: "eventListeners", enabled: false },
            ],
        }));
    }
    onCleanup(() => popperInstance?.destroy());
    return {
        show,
        hide,
        /** update position */
        update() {
            popperInstance?.update();
        },
    };
}
