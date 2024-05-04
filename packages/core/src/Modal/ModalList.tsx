import {
    OriginComponent,
    type OriginComponentInputType,
    OriginDiv,
    classNames,
    toCSSPx,
    useMapper,
} from "@cn-ui/reactive";
import { type Accessor, type JSXElement, Show } from "solid-js";
import { VirtualList } from "../virtualList";
import "./index.css";
export const MODAL_LIST_POSITION = [
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
    "top",
    "bottom",
] as const;
export type ModalListPosition = (typeof MODAL_LIST_POSITION)[number];
import "../animation/fade.css";
export interface ModalListProps<T> {
    maxStackItem?: number;
    each: T[];
    by: (item: T, index: number) => string | number;
    children: (item: T, index: Accessor<number>) => JSXElement;
    stack?: boolean;
    position?: ModalListPosition;
    itemSize?: {
        width: number;
        height: number;
    };
}

export const ModalList = OriginComponent(function <T>(
    props: OriginComponentInputType<ModalListProps<T>, HTMLDivElement, boolean>,
) {
    const { position, modalShowPosition } = useModalPosition(props);
    return (
        <Show when={props.model()}>
            <OriginDiv
                prop={props}
                class={classNames(
                    props.stack !== false &&
                        props.each.length >= (props.maxStackItem ?? 5) &&
                        "cn-modal-stack",
                    "cn-modal-list fixed overflow-y-auto overflow-x-visible h-96 w-96 ",
                    position(),
                )}
                style={{
                    "--modal-show-position": modalShowPosition(),
                    width: toCSSPx(props.itemSize?.width, "24rem"),
                }}
            >
                <VirtualList
                    each={props.each}
                    reverse={props.position?.startsWith("bottom")}
                    getItemKey={(index) => props.by(props.each[index], index)}
                    estimateSize={props.itemSize?.height ?? 64}
                    transitionName="cn-fade"
                >
                    {(item, index, { itemClass }) => {
                        itemClass("px-3 py-2");
                        return (
                            <div
                                class={classNames(
                                    "w-full rounded-xl flex-none shadow-1 bg-design-card",
                                )}
                            >
                                {props.children(item, index)}
                            </div>
                        );
                    }}
                </VirtualList>
            </OriginDiv>
        </Show>
    );
});
function useModalPosition(props: { position?: ModalListPosition }) {
    const position = useMapper(() => props.position ?? "top-left", {
        "top-left": "top-4 left-0",
        "top-right": "top-4 right-0",
        "bottom-left": "bottom-4 left-0",
        "bottom-right": "bottom-4 right-0",
        top: "top-4 left-[50%] -translate-x-1/2",
        bottom: "bottom-4 left-[50%] -translate-x-1/2",
    });
    const modalShowPosition = useMapper(() => props.position ?? "top-left", {
        "top-left": "-120px",
        "top-right": "120px",
        "bottom-left": "-120px",
        "bottom-right": "120px",
        top: "0 -120px",
        bottom: "0 120px",
    });
    return { position, modalShowPosition };
}
