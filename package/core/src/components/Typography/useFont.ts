import { loadLink } from '../_util/loadLink';

/**
 * @zh 动态字体注入器
 */
export const useFont = () => {
    return {
        /**
         * @zh 向全局注册字体 CSS 变量
         */
        register(fontFamily: string, cssVarName = '--font-special') {
            document.documentElement.style.setProperty(cssVarName, fontFamily);
        },
        /** @zh 加载字体 URL Link */
        loadFont(url: string) {
            return loadLink(url);
        },
    };
};
