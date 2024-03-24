import { Flex } from '@cn-ui/core/src/container/Flex'
import { Button } from '@cn-ui/core/src/button/Button'
import { toggleTheme } from '@cn-ui/core/src/utils/toggleTheme'
export const Header = () => {
    const menuList = [
        {
            href: './design',
            name: '设计'
        },
        {
            href: './components',
            name: '组件'
        },
        {
            href: './blog',
            name: '博客'
        }
    ]
    return (
        <header class="px-8 gap-12 flex items-center h-16 border-b border-design-border sticky top-0 left-0 ">
            <a href="/" class="text-2xl font-bold">
                CN <span class="px-1 bg-design-title text-design-pure">UI</span>
            </a>
            <Flex class="gap-4 flex-1">
                {menuList.map((i) => {
                    return (
                        <a class="px-4 transition-colors hover:bg-primary-400 hover:text-design-pure h-full block" href={i.href}>
                            {i.name}
                        </a>
                    )
                })}
            </Flex>

            <Button onclick={toggleTheme} type="text">
                明暗
            </Button>
        </header>
    )
}
