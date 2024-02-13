// 自动添加 dark 属性到 html 标签上
const query = window?.matchMedia('(prefers-color-scheme: dark)')
const setDark = (bool: Boolean) => (bool ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark'))
setDark(query.matches)
query?.addEventListener('change', (e) => {
    e.matches ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
})
