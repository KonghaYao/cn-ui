import fse from 'fs-extra';

// 生成 Index 文件
const list = fse.readdirSync('./dist/es/');
const file = list
    .filter((i) => {
        return !i.includes('.');
    })
    .map((i) => {
        return `export * from './${i}/index'`;
    })
    .join('\n');
fse.writeFileSync(
    './dist/es/index.js',
    '// Automatically generator by scripts/createIndexFile.mjs;\n' + file
);

const styleList = list.filter((i) => {
    return !i.includes('.') && fse.existsSync('./dist/es/' + i + '/index.css');
});
fse.outputJSONSync('./dist/es/style-list.json', styleList);
fse.outputFileSync(
    './dist/es/index.full.js',
    '// Bundle need it\n' +
        styleList.map((i) => `import './${i}/index.css' `).join('\n') +
        '\n import "./index.css";export * from "./index.js"'
);
