import {
    type Accessor,
    type JSX,
    type JSXElement,
    type ResolvedJSXElement,
    createMemo,
} from "solid-js";
import { isServer } from "solid-js/web";
import { type MaybeElement, useElementBounding } from "solidjs-use";
import { computed } from "../atom";
import { toCSSPx } from "../css/toCSSPx";
import { zIndexManager } from "../css/zIndexManager";

export interface FloatingCoverProps {
    target?: string | Accessor<MaybeElement | ResolvedJSXElement | JSXElement>;
    show?: Accessor<boolean>;
    children?: JSXElement;
}
/** 创建虚拟浮动层的 hook */

export const useFloatingCover = (props: FloatingCoverProps) => {
    const el = createMemo(() => {
        if (props.children) return props.children;
        return typeof props.target === "string"
            ? isServer
                ? null
                : (document.querySelector(props.target) as MaybeElement)
            : props.target?.();
    });
    const bounding = useElementBounding(el as Accessor<MaybeElement>);
    const show = computed(() => props.show?.() !== false);
    return {
        coverStyle: createMemo<JSX.CSSProperties>(() => ({
            position: "fixed",
            top: toCSSPx(bounding.top()),
            width: toCSSPx(bounding.width()),
            height: toCSSPx(bounding.height()),
            left: toCSSPx(bounding.left()),
            "z-index": zIndexManager.getIndex(),
        })),
        show,
        el,
    };
};
