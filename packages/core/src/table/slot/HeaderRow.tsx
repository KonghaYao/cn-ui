import { classNames, toCSSPx } from "@cn-ui/reactive";
import { Key } from "@solid-primitives/keyed";
import { Show, createMemo } from "solid-js";
import { MagicTableCtx, type MagicTableCtxType, MagicVirtualTableCtx } from "../MagicTableCtx";
import type { Header } from "../solidTable";
import type { VirtualItem } from "../virtual";
import { HeaderCell } from "./HeaderCell";

export function HeaderRow<T>(props: {
    hideWhenEmpty?: boolean;
    absolute: boolean;
    columnsFilter?: (items: VirtualItem[]) => VirtualItem[];
    headers: Header<T, unknown>[];
    level: number;
    isLastRow?: boolean;
    position: "center" | "left" | "right";
}) {
    const vTable = MagicVirtualTableCtx.use();
    const { estimateHeight, width, paddingRight, paddingLeft } =
        MagicTableCtx.use<MagicTableCtxType<T>>();
    const columns = createMemo<(VirtualItem | Header<T, unknown>)[]>(() => {
        if (["left", "right"].includes(props.position))
            return props.headers.map((_, index) => {
                return { index } as VirtualItem;
            });
        if (props.absolute) {
            const cols = vTable.columnVirtualizer.getVirtualItems();
            if (props.columnsFilter) return props.columnsFilter(cols);
            return cols;
        }
        return props.headers;
    });
    const rightSideLeft = createMemo(() => {
        return width() - paddingRight();
    });

    return (
        <Show when={!props.hideWhenEmpty || columns().length}>
            <tr
                data-level={props.level}
                class={classNames(
                    props.position !== "center"
                        ? "absolute pointer-events-none cn-fixed-table-header z-1"
                        : "relative",
                    " flex border-b w-full",
                    props.position === "right" && "justify-end",
                )}
                style={
                    props.absolute
                        ? {
                              height: toCSSPx(estimateHeight(), "48px"),
                              top:
                                  props.position !== "center"
                                      ? toCSSPx(props.level * 48)
                                      : undefined,
                          }
                        : {}
                }
            >
                {/* 左侧静态间隔 */}
                {!props.absolute && <td style={{ width: toCSSPx(paddingLeft()) }} />}
                <Key by="id" each={columns()}>
                    {(item) => {
                        const header = createMemo(() => props.headers[item().index]);
                        return (
                            <Show when={header()}>
                                <HeaderCell
                                    paddingLeft={props.position === "right" ? rightSideLeft() : 0}
                                    absolute={props.absolute}
                                    header={header()}
                                    item={item() as VirtualItem}
                                    useHeaderStart={!props.isLastRow}
                                />
                            </Show>
                        );
                    }}
                </Key>
                {/* 右侧静态间隔 */}
                {!props.absolute && <td style={{ width: toCSSPx(paddingRight()) }} />}
            </tr>
        </Show>
    );
}
