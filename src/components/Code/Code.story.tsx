import { atom, reflect } from '@cn-ui/use';
import { createResource, onMount } from 'solid-js';
import { Select } from '../Form';
import { Code } from '@cn-ui/highlight';
const themes = [
    'one-dark',
    'a11y-dark',
    'atom-dark',
    'base16-ateliersulphurpool.light',
    'cb',
    'coldark-cold',
    'coldark-dark',
    'coy-without-shadows',
    'darcula',
    'dracula',
    'duotone-dark',
    'duotone-earth',
    'duotone-forest',
    'duotone-light',
    'duotone-sea',
    'duotone-space',
    'ghcolors',
    'gruvbox-dark',
    'gruvbox-light',
    'holi-theme',
    'hopscotch',
    'laserwave',
    'lucario',
    'material-dark',
    'material-light',
    'material-oceanic',
    'night-owl',
    'nord',
    'one-light',
    'pojoaque',
    'shades-of-purple',
    'solarized-dark-atom',
    'synthwave84',
    'vs',
    'vsc-dark-plus',
    'xonokai',
    'z-touch',
];
export const Controller = [];
export default (props) => {
    const [code] = createResource(() => {
        return fetch('https://cdn.jsdelivr.net/npm/@cn-ui/use@1.5.0/src/atom.ts').then((res) =>
            res.text()
        );
    });
    const themeValue = atom(themes[0]);
    return (
        <div>
            动态样式 <Select options={atom(themes)} value={themeValue}></Select>
            <link
                rel="stylesheet"
                href={
                    'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-' +
                    themeValue() +
                    '.css'
                }
            />
            {code.loading ? '加载中' : <Code lang="ts">{code()}</Code>}
        </div>
    );
};
