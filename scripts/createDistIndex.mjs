import fse from 'fs-extra';
import glob from 'fast-glob';
// 生成 Index 文件
const list = fse.readdirSync('./dist/es/components');
const file = list
    .filter((i) => {
        return fse.existsSync(`./dist/es/components/${i}/index.js`);
    })
    .map((i) => {
        return `export * from './components/${i}/index';`;
    })
    .join('\n');
fse.writeFileSync(
    './dist/es/index.js',
    '// Automatically generator by scripts/createIndexFile.mjs;\n' + file
);

// 样式表连接
const styleList = await glob('./dist/es/**/*.css');
import path from 'path';
styleList.forEach((i) => {
    fse.writeFileSync(i.replace('.css', '.js'), `\n  import './${path.basename(i)}'`, {
        flag: 'a',
    });
});

fse.outputFileSync(
    './dist/es/index.full.js',
    '// Bundle need it\n' +
        styleList.map((i) => `import '${i.replace('dist/es/', '')}' `).join('\n') +
        '\nexport * from "./index.js"'
);
