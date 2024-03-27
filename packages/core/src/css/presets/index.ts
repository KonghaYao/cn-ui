// my-preset.ts
import { definePreset } from 'unocss'
import { colors, darkColors } from './colors'
import { boxShadow } from './boxShadow'
import { DarkDesignCSSVar, DesignCSSVar, designRules } from './design'
export default definePreset(() => {
    return {
        name: 'uno-preset-cn',
        theme: { colors, boxShadow },
        rules: [...designRules],
        preflights: [
            {
                getCSS: () => `
                :root {
                   ${DesignCSSVar}
                }
                .dark{
                    ${DarkDesignCSSVar}
                }
              `
            }
        ]
    }
})
export const lightColors = colors
export { darkColors, boxShadow }
