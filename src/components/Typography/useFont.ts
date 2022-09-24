import { loadLink } from '../_util/loadLink';

export const useFont = () => {
    return {
        /**
         * @zh 向全局注册默认字体
         */
        register(fontFamily: string) {
            document.documentElement.style.setProperty('--font-special', fontFamily);
        },
        /** @zh 加载字体的 URL */
        loadFont(url: string) {
            return loadLink(url);
        },
    };
};
