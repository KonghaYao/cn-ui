import { Accessor, JSXElement, children, createMemo } from "solid-js"

export const ensureChildren = (kids: Accessor<JSXElement>, limit = 1) => {
    return createMemo(() => {
        const arr = children(kids).toArray()
        if (arr.length > limit) {
            throw new Error("solid ensureChild | children is more than " + limit)
        }
        return arr
    })
}
export const ensureOnlyChild = (kids: Accessor<JSXElement>) => {
    return createMemo(() => {
        const arr = children(kids).toArray()
        if (arr.length > 1) {
            throw new Error("solid ensureChild | children is more than 1 ")
        }
        return arr[0]
    })
}
