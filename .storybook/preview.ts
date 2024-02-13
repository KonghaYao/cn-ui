import { Preview } from 'storybook-solidjs'
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
import '../src/css/dark.css'
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' }
    }
}

export default preview
