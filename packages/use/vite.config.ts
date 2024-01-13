import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import Package from './package.json';
console.log(Package.version);
const peerDeps = [Package.peerDependencies].flatMap((i) => (i ? Object.keys(i) : []));
const deps = [Package.dependencies].flatMap((i) => (i ? Object.keys(i) : []));
const warning = [Package.devDependencies].flatMap((i) => (i ? Object.keys(i) : []));

export default defineConfig(({ mode }) => {
    console.log(mode);
    return {
        plugins: [
            {
                name: 'shake',
                enforce: 'pre',
                resolveId(thisFile) {
                    if (peerDeps.some((i) => thisFile.startsWith(i))) {
                        this.warn('使用了 peerDependencies ' + thisFile);
                        return false;
                    }
                    if (warning.some((i) => thisFile.startsWith(i))) {
                        this.warn('使用了 devDependencies ' + thisFile);
                        return false;
                    }
                    if (deps.some((i) => thisFile.startsWith(i))) {
                        this.warn('使用了 Dependencies ' + thisFile);
                        return false;
                    }
                },
            },
            solid(),
        ],
        build: {
            assetsInlineLimit: 0,
            target: 'es6',
            lib: {
                entry: './src/index.ts',
                name: 'index',
                fileName: 'index',
                formats: ['es'],
            },
            sourcemap: true,
        },
        test: {
            deps: {
                inline: [/solid-js/, /@solidjs\/router/],
                registerNodeLoader: true,
            },
            environment: 'jsdom',
            globals: true,
            setupFiles: ['../../node_modules/@testing-library/jest-dom/vitest'],
            transformMode: { web: [/\.[jt]sx?$/] },
        },
    };
});
