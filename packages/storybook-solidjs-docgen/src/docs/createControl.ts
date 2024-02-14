export const createControl = (sbType, name: string) => {
    if (sbType.name === 'enum') {
        return {
            control: { type: sbType.length <= 4 ? 'radio' : 'select' },
            options: sbType.value
        }
    }
    if (sbType.name === 'boolean') {
        return {
            control: { type: 'boolean' },
            defaultValue: false
        }
    }
    switch (name) {
        case 'class':
        case 'className':
        case 'style':
            return { control: { type: 'text' } }
    }
    return {
        control: {
            type: sbType.name
        }
    }
}
