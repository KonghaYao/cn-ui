import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import p from "./package.json";
const ignoreDeps = [...Object.keys(p.dependencies)];
export default defineConfig({
    plugins: [
        {
            name: "external",
            resolveId: {
                order: "pre",
                handler(source, importer, options) {
                    if (ignoreDeps.includes(source)) {
                        return { id: source, external: true };
                    }
                },
            },
        },
        solid(),
    ],

    build: {
        emptyOutDir: true,
        lib: {
            entry: "src/index.ts", // 入口文件路径
            fileName: "esm/index",
            formats: ["es"],
        },
        target: "esnext",
    },
});
