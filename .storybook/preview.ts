import { Preview } from 'storybook-solidjs'
import { extractArgTypes } from 'storybook-solidjs-docgen/src/docs/extractArgTypes'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import '../packages/core/src/css/scrollbar.css'
import '../packages/core/src/css/dark.css'
import { autoChangeTheme } from '../packages/core/src/utils/darkMode'
autoChangeTheme()
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            expanded: true
        },
        docs: {
            toc: {
                headingSelector: 'h1, h2, h3'
            },
            extractArgTypes() {
                // @ts-ignore
                const res = extractArgTypes(...arguments)
                console.log(res)
                return res
            }
        }
    }
}

export default preview
