import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
/**
 * 组件库全打包，必须先进行 rollup 的 lite 打包
 */
export default defineConfig({
    base: './',
    publicDir: false,
    plugins: [solidPlugin({})],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            // '@root/': '/',
            '@cn-ui/core': '/dist/es/index.js',
            // 测试用途，使用本地的打包文件进行使用
        },
    },

    build: {
        outDir: './dist/full',

        lib: {
            entry: './dist/es/index.full.js',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        },
    },
});
