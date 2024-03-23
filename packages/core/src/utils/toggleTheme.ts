/** 主动切换主题，
 *  @example onclick={toggleTheme}
 */
export const toggleTheme = (event: { clientX?: number; clientY?: number }, toDark?: boolean) => {
    const isDark = document.documentElement.classList.contains('dark') ?? window?.matchMedia('(prefers-color-scheme: dark)').matches
    toDark = toDark ?? !document.documentElement.classList.contains('dark')
    const toggleDark = () => {
        document.documentElement.classList[toDark ? 'add' : 'remove']('dark')
    }
    const x = event.clientX ?? innerWidth / 2
    const y = event.clientY ?? innerHeight / 2
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

    // 兼容性处理
    /** @ts-ignore */
    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches || isDark === toDark) {
        toggleDark()
        return
    }
    /** @ts-ignore */
    const transition = document.startViewTransition(() => {
        toggleDark()
    })
    transition.ready.then(() => {
        const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

        document.documentElement.animate(
            {
                clipPath: toDark ? [...clipPath].reverse() : clipPath
            },
            {
                duration: 500,
                easing: 'ease-in',
                pseudoElement: toDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
            }
        )
    })
}
