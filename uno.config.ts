// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import presetDesign from './src/css/presets/index'
export default defineConfig({
    presets: [presetUno(), presetDesign()]
})
