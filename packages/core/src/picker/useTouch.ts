const TAP_OFFSET = 5
import { atom } from '@cn-ui/reactive'

type Direction = '' | 'vertical' | 'horizontal'

function getDirection(x: number, y: number) {
    if (x > y) {
        return 'horizontal'
    }
    if (y > x) {
        return 'vertical'
    }
    return ''
}

export function useTouch() {
    const startX = atom(0)
    const startY = atom(0)
    const deltaX = atom(0)
    const deltaY = atom(0)
    const offsetX = atom(0)
    const offsetY = atom(0)
    const direction = atom<Direction>('')
    const isTap = atom(true)

    const isVertical = () => direction() === 'vertical'
    const isHorizontal = () => direction() === 'horizontal'

    const reset = () => {
        deltaX(0)
        deltaY(0)
        offsetX(0)
        offsetY(0)
        direction('')
        isTap(true)
    }

    const start = ((event: TouchEvent) => {
        reset()
        startX(event.touches[0].clientX)
        startY(event.touches[0].clientY)
    }) as EventListener

    const move = ((event: TouchEvent) => {
        const touch = event.touches[0]
        // safari back will set clientX to negative number
        deltaX((touch.clientX < 0 ? 0 : touch.clientX) - startX())
        deltaY(touch.clientY - startY())
        offsetX(Math.abs(deltaX()))
        offsetY(Math.abs(deltaY()))

        // lock direction when distance is greater than a certain value
        const LOCK_DIRECTION_DISTANCE = 10
        if (!direction() || (offsetX() < LOCK_DIRECTION_DISTANCE && offsetY() < LOCK_DIRECTION_DISTANCE)) {
            direction(getDirection(offsetX(), offsetY()))
        }

        if (isTap() && (offsetX() > TAP_OFFSET || offsetY() > TAP_OFFSET)) {
            isTap(false)
        }
    }) as EventListener

    return {
        move,
        start,
        reset,
        startX,
        startY,
        deltaX,
        deltaY,
        offsetX,
        offsetY,
        direction,
        isVertical,
        isHorizontal,
        isTap
    }
}
