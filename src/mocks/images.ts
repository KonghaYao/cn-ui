export const mockImages = async (
    count: number,
    size: string = '512x512',
    /** 逗号分割的英文索引词 */
    words = '',
    refresh = false
): Promise<string[]> => {
    const key = ['image', words, size].join('-');
    const oldImages: string[] = JSON.parse(localStorage.getItem(key) || '[]');

    if (!refresh && oldImages.length >= count) return oldImages.slice(0, count);

    console.log('加载图片 Mock');
    const final = await [...Array(count).keys()].reduce((col, cur) => {
        return col.then(async (arr) => {
            const result = await fetch(`https://source.unsplash.com/${size}/?${words}`).then(
                (res) => res.url
            );
            arr.push(result);
            return arr;
        });
    }, Promise.resolve([] as string[]));

    localStorage.setItem(key, JSON.stringify(final));
    return final;
};
