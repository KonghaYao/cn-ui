// 用于测试 dist 文件的构建
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
    plugins: [
        solid(),
    ],

    build: {
        emptyOutDir: false,
        lib: {
            entry: "dist/ssr.js", // 入口文件路径
            fileName: "esm/index",
            formats: ["es"],
        },
        target: "esnext",
    },
});
