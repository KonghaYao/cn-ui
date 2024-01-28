export function triggerFocus(element?: HTMLInputElement | HTMLTextAreaElement, option: FocusOptions = {}) {
    if (!element) {
        return
    }

    element.focus(option)

    // Selection content
    const { cursor } = option
    if (cursor) {
        const len = element.value.length

        switch (cursor) {
            case 'start':
                element.setSelectionRange(0, 0)
                break
            case 'end':
                element.setSelectionRange(len, len)
                break
            default:
                element.setSelectionRange(0, len)
                break
        }
    }
}
