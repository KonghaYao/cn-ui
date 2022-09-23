import fs from "fs";
import chroma from "chroma-js";
const data = JSON.parse(fs.readFileSync("./colors.json", "utf-8"));
data.map((i) => {
    return {
        rgb: i.rgb,
        name: i.name,
        hsl: chroma(i.rgb).hsl(),
    };
});
