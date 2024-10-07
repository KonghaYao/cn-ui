import Arrow from "@popperjs/core/lib/modifiers/arrow.js";
import computeStyles from "@popperjs/core/lib/modifiers/computeStyles.js";
import flip from "@popperjs/core/lib/modifiers/flip.js";
import Offset from "@popperjs/core/lib/modifiers/offset.js";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow.js";
import { defaultModifiers, popperGenerator } from "@popperjs/core/lib/popper-lite.js";

/** 重新配置全局的 Popper 生成器 */
export const createPopper = popperGenerator({
    defaultModifiers: [
        ...defaultModifiers,
        flip,
        preventOverflow,
        Arrow,
        Offset,
        computeStyles,
        {
            name: "sameWidth",
            enabled: false,
            phase: "beforeWrite",
            requires: ["computeStyles"],
            fn: ({ state }) => {
                state.styles.popper.minWidth = `${state.rects.reference.width}px`;
            },
            effect: ({ state }) => {
                state.elements.popper.style.minWidth = `${
                    (state.elements.reference as any).offsetWidth
                }px`;
            },
        },
    ],
});
