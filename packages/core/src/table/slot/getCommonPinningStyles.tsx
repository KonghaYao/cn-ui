import { toCSSPx } from "@cn-ui/reactive";
import type { JSX } from "solid-js";
import { MagicTableCtx, type MagicTableCtxType } from "../MagicTableCtx";
import type { Column } from "../solidTable";

export function getCommonPinningStyles<T, D>(
    column: Column<T, D>,
    paddingLeft: number,
    isHeader = false,
): JSX.CSSProperties {
    const isPinned = column.getIsPinned();
    if (!isPinned) return {};
    const { tableScroll } = MagicTableCtx.use<MagicTableCtxType<T>>();
    let isLastLeftPinnedColumn = isPinned === "left" && column.getIsLastColumn("left");
    let isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right");

    // 判断滚动条是否在起点位置
    if (tableScroll.arrivedState.left) isLastLeftPinnedColumn = false;
    if (tableScroll.arrivedState.right) isFirstRightPinnedColumn = false;
    return {
        "box-shadow": isLastLeftPinnedColumn
            ? "#00000014 4px 0px 4px 0px "
            : isFirstRightPinnedColumn
              ? "#00000014 -4px 0px 4px 0px "
              : undefined,
        left: isHeader
            ? isPinned === "left"
                ? toCSSPx(column.getStart("left"))
                : undefined
            : isPinned
              ? toCSSPx((isPinned === "left" ? 0 : paddingLeft) + column.getStart(isPinned))
              : undefined,
        right: isPinned === "right" ? toCSSPx(column.getAfter("right")) : undefined,
        "z-index": isPinned ? 1 : 0,
    };
}
