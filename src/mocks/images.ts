import { shuffle } from 'lodash-es';

export const mockImages = async (
    count: number,
    /** 图片大小 512x512 */
    size: string = '512x512',
    /** 逗号分割的英文索引词 */
    words = '',
    refresh = false
): Promise<string[]> => {
    const key = ['image', words, size].join('-');
    const oldImages: string[] = JSON.parse(localStorage.getItem(key) || '[]');

    if (!refresh && oldImages.length >= count) return shuffle(oldImages).slice(0, count);

    const final = await getNewImages(count, size, words, key);
    return shuffle(final).slice(0, count);
};
async function getNewImages(count: number, size: string, words: string, key: string) {
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
}
