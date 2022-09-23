import { globby } from "globby";
const data = await globby("src/**/*.story.tsx");

import fs from "fs";
fs.writeFileSync(
    "./src/story.index.json",
    JSON.stringify(data.map((i) => "/" + i))
);
