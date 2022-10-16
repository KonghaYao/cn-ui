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
fse.outputJSONSync(
    './dist/es/style-list.json',
    list.filter((i) => {
        return !i.includes('.') && fse.existsSync('./dist/es/' + i + '/index.css');
    })
);
