export const createDesignRules = (design: Record<string, string>) => {
    return Object.entries(design).flatMap(([key, val]) => {
        return [
            ['bg-design-' + key, { 'background-color': `var(--cn-bg-design-${key})` }],
            ['text-design-' + key, { color: `var(--cn-text-design-${key})` }],
            ['border-design-' + key, { 'border-color': `var(--cn-border-design-${key})` }]
        ]
    })
}
/** https://ant-design.antgroup.com/docs/spec/colors-cn#%E4%B8%AD%E6%80%A7%E8%89%B2 */
export const designToken = {
    title: '#000000E0',
    text: '#000000E0',
    h2: '#000000A6',
    card: '#fafafa',
    hover: '#0000000f',
    disabled: '#00000040',
    border: '#D9D9D9FF',
    divide: '#0505050F',
    ground: '#F5F5F5FF'
}
const darkDesignToken = {
    title: '#ffffffd9',
    text: '#ffffffd9',
    h2: '#ffffffA6',
    card: '#1f1f1f',
    disabled: '#ffffff40',
    border: '#424242FF',
    divide: '#FDFDFD1F',
    ground: '#000000FF',
    hover: '#ffffff0f'
}

export const designRules = createDesignRules(designToken)

export const designCSSVar = (designToken: any) => {
    return Object.entries(designToken)
        .map(([key, val]) => {
            return `--cn-bg-design-${key}: ${val};--cn-text-design-${key}: ${val};--cn-border-design-${key}: ${val};`
        })
        .join('')
}
export const DesignCSSVar = designCSSVar(designToken)
export const DarkDesignCSSVar = designCSSVar(darkDesignToken)
