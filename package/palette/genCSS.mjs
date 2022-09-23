import fs from "fs";
const colors = JSON.parse(fs.readFileSync("./huayun-palette.json"));

const setting = `
:root{
    ${colors
        .flat()
        .map((i) => {
            return `--${i.var}:${i.value} ; /* ${i.name} */`;
        })
        .join("\n")}
}
`;
fs.writeFileSync("./setting.css", setting);
const bgCss = `
${colors
    .flat()
    .map((i) => {
        return `.bg-${i.var} {color:var(--${i.var},${i.value}) }; /* ${i.name} */`;
    })
    .join("\n")}
    `;
fs.writeFileSync("./bg.css", bgCss);
const textCss = `
${colors
    .flat()
    .map((i) => {
        return `.text-${i.var} {color:var(--${i.var},${i.value}) }; /* ${i.name} */`;
    })
    .join("\n")}
    `;
fs.writeFileSync("./text.css", textCss);
