export const flatLoop = <T extends {
    level?: number;
    options?: T
}[]>(rows: T, collection: T, deep = 0) => {
    if (deep > 3) console.warn("GroupList | find an option deeper then 3 layers");
    rows.forEach(i => {
        i.level = deep
        collection.push(i);
        if ('options' in i) {
            flatLoop((i as { options: T }).options, collection, deep + 1);
        }
    });
    return collection;
};
