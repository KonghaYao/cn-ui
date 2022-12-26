import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    return {
        plugins: [
            solidPlugin(),
            mode === 'analyze' &&
                (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            port: 3000,
        },
        resolve: {
            alias: {
                '@cn-ui/core/dist/style.css': '/package/core/src/style/index.css',
                '@cn-ui/core/': '/package/core/src/',
                '@cn-ui/animate': '/package/animate/',
                // '@cn-ui/use': '/package/use/src/index.ts',
                '@cn-ui/transition': '/package/transition/src/index.ts',
            },
        },
        optimizeDeps: {},
    };
});
