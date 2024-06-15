import path from "node:path";
import fs from "fs-extra";
// 给 dist 目录下的 js jsx 文件的 import export 路径加上后缀名称
import { glob } from "glob";

const files = await glob.glob("./dist/**/*.{js,jsx}", { absolute: true });
const reg = /^\s*(export|import)\s(.+from\s)?"(.*)(";)/gm;
for (const filePath of files) {
    const content = await fs.readFile(filePath, { encoding: "utf8" });

    const replaced = content.replace(reg, (_, p1, p2, p3, p4) => {
        const returnString = () => p1 + " " + (p2 ?? "") + '"' + p3 + p4;
        if (p3.startsWith(".") && !/\.[^\/]+$/.test(p3)) {
            const absolutePath = path.resolve(path.dirname(filePath), p3);
            if (fs.existsSync(absolutePath)) return returnString();
            if (fs.existsSync(absolutePath + ".js")) {
                p3 = p3 + ".js";
                return returnString();
            }
            if (fs.existsSync(absolutePath + ".jsx")) {
                p3 = p3 + ".jsx";
                return returnString();
            }
            console.log("err", _, absolutePath);
        }
        return returnString();
    });
    await fs.outputFile(filePath, replaced);
}
