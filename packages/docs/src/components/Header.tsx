import { Flex } from "@cn-ui/core";
import { Button } from "@cn-ui/core";
import { toggleTheme } from "@cn-ui/core";
import { For } from "solid-js";
export const Header = () => {
    const menuList = [
        {
            href: "/guide",
            name: "指引",
        },
        {
            href: "/components",
            name: "组件",
        },
        {
            href: "/blog",
            name: "博客",
        },
    ];
    return (
        <header class="px-8 gap-12 flex items-center h-16 border-b border-design-separator sticky top-0 left-0 backdrop-blur-lg z-50">
            <a href="/" class="text-2xl font-bold">
                <span class="px-1 bg-design-title text-design-pure">CN UI</span>
            </a>
            <Flex class="gap-4 flex-1">
                <For each={menuList}>
                    {(i) => {
                        return (
                            <a
                                class="px-4 transition-colors hover:bg-primary-400 hover:text-white h-full block"
                                href={i.href}
                            >
                                {i.name}
                            </a>
                        );
                    }}
                </For>
            </Flex>

            <Button onclick={toggleTheme} type="text">
                明暗
            </Button>
        </header>
    );
};
