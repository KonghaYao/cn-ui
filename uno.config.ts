// uno.config.ts
import { defineConfig, definePreset, presetUno } from 'unocss'
import { darkColors, boxShadow, lightColors } from './src/css/presets/index'
import presetTheme from 'unocss-preset-theme'
export default defineConfig({
    presets: [
        presetUno(),
        presetTheme({
            prefix: '--un-cn',
            theme: {
                dark: { colors: darkColors },
                light: { colors: lightColors }
            }
        }),
        definePreset(() => ({
            theme: {
                boxShadow
            }
        }))()
    ]
})
