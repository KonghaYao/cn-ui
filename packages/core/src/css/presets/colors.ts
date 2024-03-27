import { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, presetDarkPalettes } from '@ant-design/colors'
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
const gray = ['#fafafa', '#f5f5f5', '#f0f0f0', '#d9d9d9', '#bfbfbf', '#8c8c8c', '#595959', '#434343', '#262626', '#1f1f1f', '#141414']
export const colors = createShortcutForColors({
    primary: antColorToObj(blue),
    success: antColorToObj(green),
    warning: antColorToObj(gold),
    error: antColorToObj(red),

    gray: antColorToObj(gray),
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

export const darkColors = createShortcutForColors({
    primary: antColorToObj(presetDarkPalettes.blue),
    success: antColorToObj(presetDarkPalettes.green),
    warning: antColorToObj(presetDarkPalettes.gold),
    error: antColorToObj(presetDarkPalettes.red),

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
