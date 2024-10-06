// 用于测试 dist 文件的构建
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { nodeExternals } from 'rollup-plugin-node-externals'
export default defineConfig({
    plugins: [
        nodeExternals({
            exclude: [/^dayjs/]
        }),
        solid({
            solid: {
                generate: "ssr",
            },
            ssr: true,
        }),
    ],

    build: {
        emptyOutDir: true,
        lib: {
            entry: "src/index", // 入口文件路径
            fileName: "server",
            formats: ["es"],
        },
        target: "esnext",
    },
});
