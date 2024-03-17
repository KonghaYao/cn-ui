import type { StorybookConfig } from 'storybook-solidjs-vite'
import solidjsDocgen from '@joshwooding/vite-plugin-react-docgen-typescript'
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
    framework: {
        name: 'storybook-solidjs-vite',
        options: {}
    },
    typescript: {
        skipBabel: true,
        check: false
    },
    async viteFinal(config, { presets }) {
        config.build!.target = 'esnext'
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
    }
}
export default config
