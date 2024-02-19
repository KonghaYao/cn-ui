import { toCSSPx } from '@cn-ui/reactive'
import { Column } from '@tanstack/solid-table'
import { JSX } from 'solid-js'

export function getCommonPinningStyles<T, D>(column: Column<T, D>, paddingLeft: number): JSX.CSSProperties {
    const isPinned = column.getIsPinned()
    if (!isPinned) return {}
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')
    return {
        'box-shadow': isLastLeftPinnedColumn ? '#00000010 4px 0px 3px 0px ' : isFirstRightPinnedColumn ? '#00000010 -4px 0px 3px 0px ' : undefined,
        left: isPinned ? toCSSPx((isPinned === 'left' ? 0 : paddingLeft) + column.getStart(isPinned)) : undefined,
        'z-index': isPinned ? 1 : 0,
        position: 'sticky'
    }
}
