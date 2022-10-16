/**
 * esm 打包模式的代码
 * 不同于全打包模式，这个模式的代码外部库引用并未导入，tailwindcss 未解析，预留给开发者结合使用。
 */
import babel from '@rollup/plugin-babel';
import fse from 'fs-extra';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
const Package = fse.readJSONSync('./package.json');
const deps = [Package.dependencies, Package.devDependencies, Package.peerDependencies].flatMap(
    (i) => Object.keys(i)
);
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));

fse.emptyDirSync('./dist');
import fg from 'fast-glob';

const base = () => ({
    external: ['solid-js', 'solid-js/web', 'solid-js/store'],
    output: {
        format: 'esm',
    },
    plugins: [
        {
            name: 'clear-outside',
            resolveId(thisFile) {
                if (/^\.\.\/[A-Z][a-z]+/.test(thisFile)) {
                    return {
                        external: true,
                        id: thisFile.replace(/^(\.\.\/[A-Z][a-z|A-Z]+).*/, '$1'),
                    };
                }
            },
        },
        {
            name: 'shake',
            resolveId(thisFile) {
                if (warning.some((i) => thisFile.startsWith(i)))
                    this.warn('使用了 devDependencies ' + thisFile);
                if (deps.some((i) => thisFile.startsWith(i))) return false;
            },
        },
        resolve({
            extensions: ['.tsx', '.ts', '.js'],
        }),
        postcss({
            extract: true,
            extensions: ['.less', '.css'],
        }),
        babel({ babelHelpers: 'bundled', extensions: ['.tsx', '.ts', '.js'] }),
    ],
});

export default [
    // 组件库打包
    ...fg.sync(['./src/components/*/index.{ts,tsx}']).map((i) => {
        const config = base();
        config.input = i;
        config.output.dir = 'dist/es/' + i.replace('./src/components/', '').split('/')[0];
        return config;
    }),
    ...['./src/Transition/index.ts'].map((i) => {
        const config = base();
        config.input = i;
        config.output.dir = 'dist/es/' + i.replace('./src/', '').split('/')[0];
        return config;
    }),
    ((i) => {
        const config = base();
        config.input = i;
        config.output.dir = 'dist/es/';
        return config;
    })('./src/style/index.ts'),
];
