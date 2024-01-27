const getPadding = (el: HTMLElement) => {
    const style = window.getComputedStyle(el, null)
    const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0
    const paddingRight = Number.parseInt(style.paddingRight, 10) || 0
    const paddingTop = Number.parseInt(style.paddingTop, 10) || 0
    const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0
    return {
        left: paddingLeft,
        right: paddingRight,
        top: paddingTop,
        bottom: paddingBottom
    }
}

export const checkEllipsis = (box: HTMLElement, content: HTMLElement) => {
    const { left, right } = getPadding(box)
    const horizontalPadding = left + right
    if (box.clientWidth <= content.offsetWidth + horizontalPadding) {
        return true
    } else {
        return false
    }
}
