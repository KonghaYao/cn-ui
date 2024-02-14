import { Preview } from 'storybook-solidjs'
import { extractArgTypes } from 'storybook-solidjs-docgen/src/docs/extractArgTypes'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '../src/css/scrollbar.css'
import '../src/css/dark.css'
import { autoChangeTheme } from '../src/utils/darkMode'
autoChangeTheme()
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            expanded: true
        },
        docs: {
            extractArgTypes() {
                const res = extractArgTypes(...arguments)
                console.log(res)
                return res
            }
        }
    }
}

export default preview
