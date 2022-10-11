import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

/**
 * Story 的打包页面
 */
export default defineConfig({
    base: './',
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@cn-ui/core': '/dist/index.mjs',
        },
    },
    optimizeDeps: {
        include: ['lodash-es', 'copy-to-clipboard', 'solid-use', 'swiper/solid'],
    },
});
