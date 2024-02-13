import { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey, presetDarkPalettes } from '@ant-design/colors'
const antColorToObj = (arr: string[]) => {
    if (!arr) return {}
    const [head, ...other] = arr
    return {
        50: head,
        ...Object.fromEntries(
            other.map((i, index) => {
                return [(index + 1) * 100, i]
            })
        )
    }
}
const gray = ['#fafafa', '#f5f5f5', '#f0f0f0', '#d9d9d9', '#bfbfbf', '#8c8c8c', '#595959', '#434343', '#262626', '#1f1f1f', '#141414']

/** https://ant-design.antgroup.com/docs/spec/colors-cn#%E4%B8%AD%E6%80%A7%E8%89%B2 */
const design = {
    title: '#000000E0',
    text: '#000000E0',
    h2: '#000000A6',
    hover: '#0000000f',
    disabled: '#00000040',
    border: '#D9D9D9FF',
    divide: '#0505050F',
    ground: '#F5F5F5FF',
    DEFAULT: '#F5F5F5FF'
}

const createShortcutForColors = <T>(colors: T): T => {
    /** @ts-ignore */
    Object.values(colors).forEach((color) => {
        if (typeof color !== 'string' && color !== undefined) {
            /** @ts-ignore */
            color.DEFAULT = color.DEFAULT || (color[400] as string)
            /** @ts-ignore */
            Object.keys(color).forEach((key) => {
                const short = +key / 100
                /** @ts-ignore */
                if (short === Math.round(short)) color[short] = color[key]
            })
        }
    })
    return colors
}

export const colors = createShortcutForColors({
    primary: antColorToObj(blue),
    success: antColorToObj(green),
    warning: antColorToObj(gold),
    error: antColorToObj(red),
    design,

    gray: antColorToObj(grey),
    red: antColorToObj(red),
    volcano: antColorToObj(volcano),
    orange: antColorToObj(orange),
    gold: antColorToObj(gold),
    yellow: antColorToObj(yellow),
    lime: antColorToObj(lime),
    green: antColorToObj(green),
    cyan: antColorToObj(cyan),
    blue: antColorToObj(blue),
    geekblue: antColorToObj(geekblue),
    purple: antColorToObj(purple),
    magenta: antColorToObj(magenta)
})
const darkdesign = {
    title: '#ffffffd9',
    text: '#ffffffd9',
    h2: '#ffffffA6',
    disabled: '#ffffff40',
    border: '#424242FF',
    divide: '#FDFDFD1F',
    ground: '#000000FF',
    hover: '#ffffff0f',
    DEFAULT: '#000000FF'
}
export const darkColors = createShortcutForColors({
    primary: antColorToObj(presetDarkPalettes.blue),
    success: antColorToObj(presetDarkPalettes.green),
    warning: antColorToObj(presetDarkPalettes.gold),
    error: antColorToObj(presetDarkPalettes.red),
    design: darkdesign,

    gray: antColorToObj(presetDarkPalettes.grey),
    red: antColorToObj(presetDarkPalettes.red),
    volcano: antColorToObj(presetDarkPalettes.volcano),
    orange: antColorToObj(presetDarkPalettes.orange),
    gold: antColorToObj(presetDarkPalettes.gold),
    yellow: antColorToObj(presetDarkPalettes.yellow),
    lime: antColorToObj(presetDarkPalettes.lime),
    green: antColorToObj(presetDarkPalettes.green),
    cyan: antColorToObj(presetDarkPalettes.cyan),
    blue: antColorToObj(presetDarkPalettes.blue),
    geekblue: antColorToObj(presetDarkPalettes.geekblue),
    purple: antColorToObj(presetDarkPalettes.purple),
    magenta: antColorToObj(presetDarkPalettes.magenta)
})
