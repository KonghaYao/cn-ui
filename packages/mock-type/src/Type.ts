export function Type(obj: any): string {
    return obj === null || obj === undefined
        ? String(obj)
        : /** @ts-ignore */
        Object.prototype.toString
            .call(obj)
            .match(/\[object (\w+)\]/)[1]
            .toLowerCase();
}
