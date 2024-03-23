// 自动添加 dark 属性到 html 标签上
import { toggleTheme } from './toggleTheme'

/** 自动根据系统配色触发主题切换 */
export const autoChangeTheme = () => {
    const query = window?.matchMedia('(prefers-color-scheme: dark)')
    toggleTheme({}, !!query.matches)
    query?.addEventListener('change', (e) => {
        toggleTheme({}, !!e.matches)
    })
}
