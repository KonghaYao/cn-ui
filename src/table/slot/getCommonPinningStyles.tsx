import { Column } from '@tanstack/solid-table'
import { JSX } from 'solid-js'

export function getCommonPinningStyles<T, D>(column: Column<T, D>): JSX.CSSProperties {
    const isPinned = column.getIsPinned()
    if (!isPinned) return {}
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right')
    return {
        'box-shadow': isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset' : isFirstRightPinnedColumn ? '4px 0 4px -4px gray inset' : undefined,
        left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
        right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
        'z-index': isPinned ? 1 : 0,
        position: 'sticky'
    }
}
