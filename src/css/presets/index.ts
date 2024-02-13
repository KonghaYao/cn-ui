// my-preset.ts
import { definePreset } from 'unocss'
import { colors, darkColors } from './colors'
import { boxShadow } from './boxShadow'
export default definePreset((props: {}) => {
    return {
        name: 'uno-preset-cn',
        theme: { colors, boxShadow }
    }
})
export const lightColors = colors
export { darkColors, boxShadow }
