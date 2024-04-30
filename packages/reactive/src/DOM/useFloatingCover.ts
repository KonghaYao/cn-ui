import { toCSSPx } from "@cn-ui/reactive";
import { type Accessor, type JSX, type ResolvedJSXElement, createMemo } from "solid-js";
import { type MaybeElement, useElementBounding } from "solidjs-use";

export interface FloatingCoverProps {
    target: string | Accessor<MaybeElement | ResolvedJSXElement>;
    show?: Accessor<boolean>;
}
/** 创建虚拟浮动层的 hook */

export const useFloatingCover = (props: FloatingCoverProps) => {
    const el = createMemo(() => {
        return typeof props.target === "string"
            ? (document.querySelector(props.target) as MaybeElement)
            : props.target();
    });
    const bounding = useElementBounding(el as Accessor<MaybeElement>);
    return {
        coverStyle: createMemo<JSX.CSSProperties>(() => ({
            position: "fixed",
            top: toCSSPx(bounding.top()),
            width: toCSSPx(bounding.width()),
            height: toCSSPx(bounding.height()),
            left: toCSSPx(bounding.left()),
            "z-index": 10000,
            display: props.show?.() === false ? "none" : undefined,
        })),
    };
};
