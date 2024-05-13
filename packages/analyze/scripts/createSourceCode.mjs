import fs from "fs-extra";

fs.emptyDirSync("./temp");
export const createSourceCode = (imports, options) => {
    fs.outputFileSync(
        `./temp/${imports[0]}.ts`,
        `import { ${imports.join(", ")} } from '@cn-ui/core';\n console.log(${imports.join(", ")})`,
    );
};
import modules from "../modules.mjs";
// 将需要分析的组件放置在这里
modules.forEach((i) => {
    createSourceCode(i);
});
