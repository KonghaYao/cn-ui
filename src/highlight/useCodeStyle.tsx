import { Atom, atomization, reflect } from '@cn-ui/reactive'

export const CodeStyleNames = [
    'a11y-dark',
    'a11y-light',
    'agate',
    'an-old-hope',
    'androidstudio',
    'arduino-light',
    'arta',
    'ascetic',
    'atom-one-dark-reasonable',
    'atom-one-dark',
    'atom-one-light',
    'brown-paper',
    'codepen-embed',
    'color-brewer',
    'dark',
    'default',
    'devibeans',
    'docco',
    'far',
    'felipec',
    'foundation',
    'github-dark-dimmed',
    'github-dark',
    'github',
    'gml',
    'googlecode',
    'gradient-dark',
    'gradient-light',
    'grayscale',
    'hybrid',
    'idea',
    'intellij-light',
    'ir-black',
    'isbl-editor-dark',
    'isbl-editor-light',
    'kimbie-dark',
    'kimbie-light',
    'lightfair',
    'lioshi',
    'magula',
    'mono-blue',
    'monokai-sublime',
    'monokai',
    'night-owl',
    'nnfx-dark',
    'nnfx-light',
    'nord',
    'obsidian',
    'panda-syntax-dark',
    'panda-syntax-light',
    'paraiso-dark',
    'paraiso-light',
    'pojoaque',
    'purebasic',
    'qtcreator-dark',
    'qtcreator-light',
    'rainbow',
    'routeros',
    'school-book',
    'shades-of-purple',
    'srcery',
    'stackoverflow-dark',
    'stackoverflow-light',
    'sunburst',
    'tokyo-night-dark',
    'tokyo-night-light',
    'tomorrow-night-blue',
    'tomorrow-night-bright',
    'vs',
    'vs2015',
    'xcode',
    'xt256'
] as const
type List2Union<List extends readonly unknown[]> = List[number]
export type AllowedCodeStyleNames = List2Union<typeof CodeStyleNames>

/**
 * @zh easily to use prism-themes！
 */
export const useCodeStyle = (codeStyleName: AllowedCodeStyleNames | Atom<AllowedCodeStyleNames> = CodeStyleNames[0]) => {
    const themeValue = atomization(codeStyleName)
    const url = reflect(() => {
        const name = themeValue()
        console.log(name)
        return name.startsWith('http') ? name : 'https://cdn.jsdelivr.net/npm/highlight.js/styles/' + themeValue() + '.css'
    })

    return {
        link: <link rel="stylesheet" href={url()} />
    }
}
