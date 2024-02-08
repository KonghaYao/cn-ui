/**
 * 函数式组件中的事件暴露
 * @example
 * interface Events {
 *     a: string
 *     onClick: (data: string) => void
 *     onFill: (data: number) => string
 * }
 * const a = (props: Events) => {
 *     const emit = defineEmits<Events>(props)
 *     emit('onClick', '')
 *     emit('onFill',100)
 *     return
 * }
 */
export const defineEmits = <E>(props: E) => {
    /** @ts-ignore */
    return <D extends keyof E, Fn extends (...args: any[]) => any = E[D]>(name: D, ...args: Parameters<Fn>): ReturnType<Fn> => {
        /** @ts-ignore */
        return props[name]?.(...args)
    }
}
