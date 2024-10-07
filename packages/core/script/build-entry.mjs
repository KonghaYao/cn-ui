import path from "node:path";
import fs from "fs-extra";
import { glob } from "glob";

// 生成 src/index.ts
const e = await glob(["./src/*/index.ts"]);
const jsFile = e
    .sort()
    // TODO 这些组件使用了 @ark-ui 导致不能 tree-shake
    .filter(i => ![/avatar/, /collapse/, /inputNumber/, /chatBox/].some(reg => reg.test(i)))
    .map((i) => {
        return `export * from "./${path.relative("./src/", i).replace(".ts", ".js")}";`;
    })
    .join("\n");
fs.outputFileSync("./src/index.ts", jsFile);

fs.outputFileSync("./dist/index.js", `export * from './lib/index.js';`);
fs.outputFileSync("./dist/index.d.ts", `export * from './lib/index';`);
