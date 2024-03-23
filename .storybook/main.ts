import type { StorybookConfig } from 'storybook-solidjs-vite'
import solidjsDocgen from '@joshwooding/vite-plugin-react-docgen-typescript'
const config: StorybookConfig = {
    stories: ['../packages/core/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)', '../packages/highlight/src/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'],

    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-mdx-gfm'],

    framework: {
        name: 'storybook-solidjs-vite',
        options: {}
    },

    typescript: {
        check: false
    },

    async viteFinal(config, { presets }) {
        if (config.build) {
            config.build!.target = 'esnext'
        }
        // Add docgen plugin
        const { reactDocgenTypescriptOptions } = await presets.apply<any>('typescript', {})
        config.plugins?.push({
            enforce: 'pre',
            ...solidjsDocgen({
                ...reactDocgenTypescriptOptions,
                savePropValueAsString: true
            })
        })
        config.assetsInclude = ['/sb-preview/runtime.js']
        return config
    },

    docs: {
        autodocs: false
    }
}
export default config
