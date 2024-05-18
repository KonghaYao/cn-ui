import { definePreset } from "unocss";
import { TokenRules } from "../tokens";
import { BaseColor } from "../tokens/BaseColor";
import { backgroundTokens } from "../tokens/backgroundTokens";
import { labelTokens } from "../tokens/labelTokens";
import { materialTokens } from "../tokens/materialTokens";
import { separatorTokens } from "../tokens/separatorTokens";
import { boxShadow } from "./boxShadow";
import { colors, darkColors } from "./colors";

export default definePreset(() => {
    const tokenRules = new TokenRules(
        [
            ...backgroundTokens(BaseColor),
            ...separatorTokens(BaseColor),
            ...labelTokens(BaseColor),
            ...materialTokens(),
        ],
        BaseColor,
    );
    return {
        name: "uno-preset-cn",
        theme: { colors, boxShadow },
        rules: [...tokenRules.toUnoCssRules(), ["indent-none", { indent: 0 }]],
        preflights: [
            {
                getCSS: () => `
                :root {
                   ${tokenRules.toCssVars().light}
                }
                .dark{
                    ${tokenRules.toCssVars().dark}
                }
              `,
            },
        ],
    };
});

export const lightColors = colors;
export { darkColors, boxShadow };
