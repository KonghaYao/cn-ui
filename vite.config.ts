import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    server: {
        port: 3000,
    },
    build: {
        target: 'esnext',
        lib: {
            entry: './src/index.ts',
            name: 'CNUI',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['solid-js', 'solid-js/web', 'solid-js/store'],
        },
    },
});
