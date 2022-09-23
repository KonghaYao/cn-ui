import chroma from "chroma-js";
import fs from "fs";
const palette = JSON.parse(fs.readFileSync("./arco-palette.json"));
const colors = JSON.parse(fs.readFileSync("./colors.json"));

const findSimilar = (color) => {
    let closestNumber = Infinity;
    let closest;
    colors.forEach((element) => {
        const d = chroma.distance(color, element.hex);
        if (closestNumber > d) {
            closestNumber = d;
            closest = element;
        }
    });
    return closest;
};
const data = Object.entries(palette)
    .map(([theme, map]) => {
        return Object.entries(map).map(([colorName, colors]) => {
            return colors.reverse().map((i, index) => {
                const replacer = findSimilar(i);
                return {
                    var: [theme, colorName, index].join("-"),
                    value: replacer.hex,
                    name: replacer.name,
                };
            });
        });
    })
    .flat();
fs.writeFileSync("./huayun-palette.json", JSON.stringify(data));
