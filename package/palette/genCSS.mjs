import fs from "fs";
const colors = JSON.parse(fs.readFileSync("./dist/huayun-palette.json"));

const setting = `
:root{
    ${colors.light
        .flat()
        .map((i) => {
            return `--${i.var}:${i.value} ; /* ${i.name} */`;
        })
        .join("\n")}
}
`;
const setting_dark = `
@media(prefers-color-scheme:dark) {
    :root{
   ${colors.dark
       .flat()
       .map((i) => {
           return `--${i.var}:${i.value} ; /* ${i.name} */`;
       })
       .join("\n")}
    }
}`;
fs.writeFileSync("./dist/setting.css", setting);
fs.writeFileSync("./dist/setting.dark.css", setting_dark);
const bgCss = `
${colors.light
    .flat()
    .map((i) => {
        return `.bg-${i.var} {background-color:var(--${i.var},${i.value}) }; /* ${i.name} */`;
    })
    .join("\n")}
    `;
fs.writeFileSync("./dist/bg.css", bgCss);
const textCss = `
${colors.light
    .flat()
    .map((i) => {
        return `.text-${i.var} {color:var(--${i.var},${i.value}) }; /* ${i.name} */`;
    })
    .join("\n")}
    `;
fs.writeFileSync("./dist/text.css", textCss);

fs.writeFileSync(
    "./dist/index.css",
    `
@import url('./setting.css');
@import url('./setting.dark.css');
@import url('./bg.css');
@import url('./text.css');
`
);
