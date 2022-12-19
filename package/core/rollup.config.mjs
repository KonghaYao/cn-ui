/**
 * esm 打包模式的代码
 * 不同于全打包模式，这个模式的代码外部库引用并未导入，tailwindcss 未解析，预留给开发者结合使用。
 */
import babel from '@rollup/plugin-babel';
import fse from 'fs-extra';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
const Package = fse.readJSONSync('./package.json');
const deps = [Package.dependencies, Package.devDependencies, Package.peerDependencies].flatMap(
    (i) => Object.keys(i)
);
const warning = [Package.devDependencies].flatMap((i) => Object.keys(i));

fse.emptyDirSync('./dist/es/');
import glob from 'fast-glob';
export default [
    'src/style/index.ts',
    ...(await glob(['src/components/**/index.{ts,tsx,js}'])).filter(
        (i) => !i.endsWith('.d.ts') && !i.endsWith('.story.tsx')
    ),
].map((i) => {
    return {
        input: i,

        external: ['solid-js', 'solid-js/web', 'solid-js/store', '@cn-ui/core'],
        output: {
            dir: path.dirname(i).replace('src', 'dist/es'),
            format: 'esm',
        },
        plugins: [
            // {
            //     name: 'clear-outside',
            //     resolveId(thisFile) {
            //         if (/^\.\.\/[A-Z][a-z]+/.test(thisFile)) {
            //             return {
            //                 external: true,
            //                 id: thisFile.replace(/^(\.\.\/[A-Z][a-z|A-Z]+).*/, '$1'),
            //             };
            //         }
            //     },
            // },
            {
                name: 'shake',
                resolveId(thisFile, id, { isEntry }) {
                    if (thisFile.endsWith('.css')) return;
                    return isEntry ? undefined : false;
                    // if (warning.some((i) => thisFile.startsWith(i)))
                    //     this.warn('使用了 devDependencies ' + thisFile);
                    // if (deps.some((i) => thisFile.startsWith(i))) return false;
                },
            },
            // resolve({
            //     extensions: ['.tsx', '.ts', '.js'],
            // }),
            postcss({
                extract: true,
                extensions: ['.less', '.css'],
            }),
            babel({ babelHelpers: 'bundled', extensions: ['.tsx', '.ts', '.js'] }),
        ],
    };
});
