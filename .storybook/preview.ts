import { Preview } from 'storybook-solidjs';
import '@unocss/reset/tailwind-compat.css'
import 'virtual:uno.css'
const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
    },
};

export default preview;
