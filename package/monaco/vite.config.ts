import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import visualizer from 'rollup-plugin-visualizer';
import Package from './package.json';
const deps = [Package.dependencies, Package.devDependencies, Package.peerDependencies].flatMap(
    (i) => Object.keys(i)
);
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));
console.log(deps);
export default defineConfig(({ mode }) => {
    return {
        plugins: [
            {
                name: 'shake',
                enforce: 'pre',
                resolveId(thisFile) {
                    if (warning.some((i) => thisFile.startsWith(i)))
                        this.warn('使用了 devDependencies ' + thisFile);
                    if (deps.some((i) => thisFile.startsWith(i))) return false;
                },
            },
            solidPlugin(),
            mode === 'analyze' &&
                (visualizer({ open: true, filename: 'visualizer/stat.html' }) as any),
        ],
        server: {
            port: 3000,
        },
        build: {
            assetsInlineLimit: 0,
            target: 'es6',
            lib: {
                entry: './src/index.tsx',
                name: 'index',
                fileName: 'index',
                formats: ['es'],
            },

            sourcemap: true,
        },
    };
});
