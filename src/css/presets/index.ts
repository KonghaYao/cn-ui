// my-preset.ts
import { definePreset } from 'unocss'
import { colors } from './colors'
import { boxShadow } from './boxShadow'
export default definePreset((props: {}) => {
    return {
        name: 'uno-preset-cn',
        theme: { colors, boxShadow }
    }
})
