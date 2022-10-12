import { Atom, atomization, reflect } from '@cn-ui/use';

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
] as const;
type List2Union<List extends readonly unknown[]> = List[number];
export type AllowedCodeStyleNames = List2Union<typeof themes>;
export { themes as CodeStyleNames };

/**
 * @zh easily to use prism-themes！
 */
export const useCodeStyle = (
    codeStyleName: AllowedCodeStyleNames | string | Atom<AllowedCodeStyleNames | string> = themes[0]
) => {
    const themeValue = atomization(codeStyleName);
    const url = reflect(() => {
        const name = themeValue();
        return name.startsWith('http')
            ? name
            : 'https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-' +
                  themeValue() +
                  '.css';
    });
    return {
        link: <link rel="stylesheet" href={url()} />,
    };
};
