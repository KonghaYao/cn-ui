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
const fs = new FS("testfs").promises;

const initFS = async () => {
    await fs.writeFile("/README.md", "It's a readme file!");
    await fs.mkdir("/src");
    await fs.writeFile("/src/README_zh_cn.md", "你好！");
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
                <FileExplorer explorerModel={explorerModel}>
                    {(item, explorer) => {
                        console.log(item.name);
                        return (
                            <>
                                {item.type === "file" && <div>{item.name}</div>}
                                {item.type === "dir" && (
                                    <div onclick={() => explorer.router.enter(item.name)}>
                                        {item.name}
                                    </div>
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
