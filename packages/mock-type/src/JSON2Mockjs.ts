import { Type } from "./Type"

const includesPart = (a: string | undefined, b: string[]) => {
    if (!a) return false
    b = b.map((i) => i.toLowerCase())
    return b.some((i) => a.toLowerCase().includes(i))
}
const typeProducer: Record<string, (val: any, name: string) => [string, unknown]> = {
    /** @ts-ignore */
    array(data: unknown[], name) {
        const length = data.length
        let val
        if (includesPart(Type(data[0]), ['number', 'string', 'regexp', 'boolean'])) {
            val = findProducerAndApply(data[0], '0')[1]
        } else {
            const newData = data.reduce((col, cur) => {
                /** @ts-ignore */
                return Object.assign(col, cur)
            }, {} as Record<string, unknown>)
            val = findProducerAndApply(newData, name)[1]
        }
        if (length === 0) return [name + '|1', [val]]
        if (length % 5 === 0 || length % 10 === 0) return [name + '|' + length, [val]]
        return [name + '|' + 3, [val]]
    },
    /** @ts-ignore */
    object(temp: Record<string, unknown>, name) {
        return [
            name,
            Object.fromEntries(
                Object.entries(temp).map(([key, val]) => {
                    return findProducerAndApply(val, key)
                })
            )
        ]
    },
    number(temp: number, name) {
        if (includesPart(name, ['id'])) return [name + '|+1', temp]
        return [name, temp]
    },
    string(val: string, name) {
        if (includesPart(name, ['url', 'href'])) {
            if (val.startsWith('http:')) return [name, '@url(http)']
            if (val.startsWith('https:')) return [name, '@url(https)']
            return [name, '@url']
        }
        if (includesPart(name, ['title'])) return [name, '@title']
        if (includesPart(name, ['id'])) return [name, '@id']
        if (includesPart(name, ['description'])) return [name, '@paragraph']

        if (includesPart(name, ['avatar', 'img', 'image'])) return [name, '@image(64x64)']

        if (/^\d{4}[-\/\.]\d{2}[-\/\.]\d{2}$/.test(val)) return [name, '@time(yyyy-MM-dd)']
        if (/^\d{2}\/\d{2}\/\d{2,4}$/.test(val)) return [name, '@time(MM-dd-yyyy)']
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(val)) return [name, '@time(yyyy-MM-dd HH:mm:ssZ)']
        // if (typeof Date.parse(val) === 'number') return [name, '@time']
        return [name, '@word']
    },
    boolean(val: boolean, name) {
        return [name, val]
    },
    regex(val: RegExp, name) {
        return [name, val]
    }
}
const findProducerAndApply = (any: unknown, parentKey: string): [string, unknown] => {
    const p = typeProducer[Type(any)]
    if (p) {
        return p(any, parentKey)
    } else {
        return [parentKey, any]
    }
}
/** 将 json 数据转为 Mockjs 的模板 */
export const JSON2Mockjs = (json: any) => {
    return findProducerAndApply({ root: json }, 'root')[1] as Record<string, any>
}
