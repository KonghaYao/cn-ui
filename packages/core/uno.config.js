// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import presetCN, { darkColors, lightColors } from './src/css/presets/index'
import presetTheme from 'unocss-preset-theme'
import presetChinese from 'unocss-preset-chinese'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
    presets: [
        presetUno(),
        presetTheme({
            prefix: '--cn',
            theme: {
                dark: { colors: darkColors },
                light: { colors: lightColors }
            }
        }),
        presetCN,
        presetChinese({
            chineseType: 'simplified' // 指定文本为简体中文
        })
    ],
    transformers: [transformerDirectives({
        applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    })]
})
