import { globby } from 'globby';
import fse from 'fs-extra';
const message = [];

/** 文件字符统计 */
const analyzeSourceCode = async () => {
    const code = await globby('src/**/*.{ts,js,tsx}');
    const style = await globby('src/**/*.{css,less}');
    const story = code.filter((i) => {
        return /\.story\..*$/.test(i);
    });
    const declare = code.filter((i) => {
        return /\.d\..*$/.test(i);
    });
    const normal = code.filter((i) => {
        return ![story, declare].flat().includes(i);
    });
    const total = Object.entries({ style, story, declare, normal });
    const result = await Promise.all(
        total.map(async ([name, paths]) => {
            const val = await Promise.all(
                paths.map(async (i) => {
                    const stat = await fse.stat(i);
                    const text = await fse.promises.readFile(i, { encoding: 'utf-8' });
                    let row = 0;
                    for (let i = 0; i < text.length; i++) {
                        if (text.charCodeAt(i) === 10) {
                            row++;
                        }
                    }
                    return { size: stat.size, row, path: i, length: text.length };
                })
            );
            return [name, val];
        })
    );
    fse.outputJSON('dist/analyze.txt', Object.fromEntries(result));
};
analyzeSourceCode();
