const cache = new Set<string>();
/** @zh 根据 url 加载 link 标签 */
export const loadLink = async (path: string) => {
    if (cache.has(path)) return;
    return new Promise((res, rej) => {
        const link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        document.body.appendChild(link);
        link.onload = () => {
            res(true);
            cache.add(path);
        };
        link.onerror = () => {
            rej(false);
        };
    });
};
