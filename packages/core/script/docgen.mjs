/** 生成文档所需要的构建文件 */
import fs from "node:fs";
import { parse } from "react-docgen-typescript";
const options = {
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    shouldIncludePropTagMap: true,
    propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    savePropValueAsString: true,
};

const item = parse("./src/index.ts", options);
fs.writeFileSync(
    "./dist/docgen.mjs",
    item
        .map((i) => {
            return `export const ${i.displayName} = ${JSON.stringify(i)}`;
        })
        .join("\n"),
);
console.log(item.map((i) => [i.displayName]));
