import { red, volcano, orange, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors'
const antColorToObj = (arr: string[]) => {
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
const neutral = {
    title: '#000000E0',
    h1: '#000000E0',
    h2: '#000000A6',
    hover: '#0000000f',
    disabled: '#00000040',
    border: '#D9D9D9FF',
    divide: '#0505050F',
    ground: '#F5F5F5FF'
}
export const colors = {
    primary: antColorToObj(blue),
    success: antColorToObj(green),
    warning: antColorToObj(gold),
    error: antColorToObj(red),

    neutral,
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
}

// assign default color, and color shortcuts
Object.values(colors).forEach((color) => {
    if (typeof color !== 'string' && color !== undefined) {
        /** @ts-ignore */
        color.DEFAULT = color.DEFAULT || (color[400] as string)
        Object.keys(color).forEach((key) => {
            const short = +key / 100
            if (short === Math.round(short)) color[short] = color[key]
        })
    }
})
