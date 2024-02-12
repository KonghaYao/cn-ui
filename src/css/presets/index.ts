// my-preset.ts
import { definePreset } from 'unocss'
import { colors } from './colors'

const theme = { colors }
export default definePreset(() => {
    return {
        name: 'uno-preset-cn',
        theme
    }
})
