import type { Meta, StoryObj } from "storybook-solidjs";

import { type ExplorerAPI, atom } from "@cn-ui/reactive";
import { Flex } from "../container/Flex";
import { FileExplorer } from "./index";

const meta = {
    title: "Common 通用/FileExplorer 文件系统",
    component: FileExplorer,
    tags: ["autodocs"],
    argTypes: {},
} satisfies Meta<typeof FileExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;
import FS from "@isomorphic-git/lightning-fs";
import { AiOutlineFile, AiOutlineFolder } from "solid-icons/ai";
import { Icon } from "../icon/Icon";
const fs = new FS("testfs").promises;

const initFS = async () => {
    await fs.writeFile("/README.md", "It's a readme file!");
    await fs.mkdir("/src").catch(() => {});
    await fs.writeFile("/src/README_zh_cn.md", "你好！");
    await fs.mkdir("/src/some").catch(() => {});
    await fs.mkdir("/src/some/link").catch(() => {});
    return;
};
initFS();
/**  */
export const Primary: Story = {
    name: "Normal 正常渲染",
    render() {
        const explorerModel = {
            paths: atom([] as string[]),
            async listItems(paths) {
                const p = "/" + paths.join("/");
                const items = await fs.readdir(p);
                console.log(items);
                return Promise.all(
                    items.map(async (i) => {
                        const path = p + "/" + i;
                        return {
                            name: i,
                            path,
                            ...(await fs.stat(path)),
                        };
                    }),
                );
            },
            isFile(item) {
                return item.type === "file";
            },
            isFolder(item) {
                return item.type === "dir";
            },
        } satisfies ExplorerAPI<{ name: string; path: string } & FS.Stats>;
        return (
            <Flex vertical gap="4px">
                <FileExplorer class={"w-96"} explorerModel={explorerModel} emptyView={"无数据"}>
                    {(item, explorer) => {
                        return (
                            <>
                                {item.type === "file" && (
                                    <li class="cursor-pointer">
                                        <Icon>
                                            <AiOutlineFile />
                                        </Icon>
                                        {item.name}
                                    </li>
                                )}
                                {item.type === "dir" && (
                                    <li
                                        class="cursor-pointer"
                                        onclick={() => explorer.router.enter(item.name)}
                                    >
                                        <Icon>
                                            <AiOutlineFolder />
                                        </Icon>
                                        {item.name}
                                    </li>
                                )}
                            </>
                        );
                    }}
                </FileExplorer>
            </Flex>
        );
    },
    args: {},
};
