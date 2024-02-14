import type { StorybookConfig } from 'storybook-solidjs-vite'
import solidjsDocgen from '@joshwooding/vite-plugin-react-docgen-typescript'
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: 'storybook-solidjs-vite',
        options: {}
    },
    docs: {
        autodocs: 'tag'
    },
    typescript: {
        skipBabel: true,
        check: false
    },
    async viteFinal(config, { presets }) {
        // Add docgen plugin
        const { reactDocgen: reactDocgenOption, reactDocgenTypescriptOptions } = await presets.apply<any>('typescript', {})
        config.plugins?.push({
            enforce: 'pre',
            ...solidjsDocgen({
                ...reactDocgenTypescriptOptions,
                savePropValueAsString: true
            })
        })
        return config
    }
}
export default config
