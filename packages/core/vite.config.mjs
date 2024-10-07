// 用于测试 dist 文件的构建
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import nodeExternals from "rollup-plugin-node-externals";
export default defineConfig({
    plugins: [
        nodeExternals({
            exclude: [/@popperjs/]
        }),
        solid({
            solid: {
                generate: "ssr",
            },
            ssr: true,
        }),
    ],

    build: {
        emptyOutDir: false,
        lib: {
            entry: "dist/index.js", // 入口文件路径
            formats: ["es"],
            fileName: "server",
        },

        // rollupOptions: {
        //     output: {
        //         preserveModules: true,
        //         dir: "dist/server",
        //         preserveModulesRoot: 'lib',
        //         entryFileNames: (chunkInfo) => {
        //             return '[name].js';
        //         }
        //     }
        // },
        target: "esnext",
    },
});
