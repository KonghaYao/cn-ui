// 用于测试 dist 文件的构建
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import nodeExternals from "rollup-plugin-node-externals";
export default defineConfig(({ mode }) => ({
    plugins: [
        nodeExternals({
        }),
        solid({
            solid: mode === 'server' ? {
                generate: "ssr",
                hydratable: true
            } : undefined,
            ssr: true,
        }),
    ],

    build: {
        emptyOutDir: false,
        lib: {
            entry: "dist/svg-spinner.tsx", // 入口文件路径
            formats: ["es"],
            fileName: mode,
        },
        sourcemap: true,
        target: "esnext",
    },
}));
