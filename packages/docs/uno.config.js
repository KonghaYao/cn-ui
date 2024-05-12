import presetCN, { darkColors, lightColors } from "@cn-ui/core/uno-preset";
import transformerDirectives from "@unocss/transformer-directives";
// uno.config.ts
import { defineConfig, presetUno } from "unocss";
import presetChinese from "unocss-preset-chinese";
import presetTheme from "unocss-preset-theme";

export default defineConfig({
    presets: [
        presetUno(),
        presetTheme({
            prefix: "--cn",
            theme: {
                dark: { colors: darkColors },
                light: { colors: lightColors },
            },
        }),
        presetCN,
        presetChinese({
            chineseType: "simplified", // 指定文本为简体中文
        }),
    ],
    transformers: [transformerDirectives()],
});
