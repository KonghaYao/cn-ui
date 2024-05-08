import type { ColumnDef } from "../solidTable";
/**
 * 创建一个虚拟列的数组。这个数组不支持 forEach map 等属性，只允许直接取值
 * @param num 列的数量。
 * @param gen 一个可选的生成器函数，用于根据列的索引自定义每列的属性。
 * @returns 返回一个代理数组，模拟了具有指定数量的列，每列具有基础的accessorKey和header属性，以及可选的通过gen函数生成的额外属性。
 */
export const makeVirtualColumns = <T, D>(
    num: number,
    gen?: (item: string) => Partial<ColumnDef<T, D>>,
) => {
    return new Proxy(Array(num), {
        get(target, prop) {
            // 当获取代理数组中的一个属性时，如果该属性是一个数字字符串，则将其解释为列定义对象。
            if (typeof prop === "string" && Number.parseInt(prop).toString() === prop) {
                return {
                    accessorKey: prop.toString(),
                    header: `Col ${prop.toString()}`,
                    ...(gen?.(prop) ?? {}),
                };
            }
            return Reflect.get(target, prop);
        },
    });
};

/**
 * 创建一个虚拟数据对象的数组。
 * @param num 数据行的数量。
 * @param columnsKey 包含所有有效列键的数组。
 * @returns 返回一个包含指定数量的虚拟数据对象的数组，每个数据对象的属性由列键和行索引组合而成。
 * @example [ {1:'0-0'}, 1:'0-1'} ]
 */
export const makeVirtualData = (num: number, columnsKey: string[]): Record<string, string>[] =>
    [...Array(num).keys()].map((y) => {
        // 为每一行数据创建一个代理对象，使得只有在columnsKey中的键才能获取到值。
        return new Proxy(
            {},
            {
                get(target, prop) {
                    // 当尝试获取代理对象的属性时，如果属性是列键，则返回一个由行索引和列键组合的字符串。
                    if (typeof prop === "string" && columnsKey.includes(prop)) {
                        return [y, prop].join("-");
                    }
                    return Reflect.get(target, prop);
                },
            },
        );
    });
