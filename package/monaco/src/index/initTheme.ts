import type Theme from "monaco-themes/themes/themelist.json";
import { CDN } from "../cdn";
type ThemeList = {
    [key in keyof typeof Theme]: {
        themeName: string;
        path: string;
        json: null | Object;
    };
};
// 自定义的 Theme 的 列表
const extraTheme = {
    "github-gist": {
        themeName: "github-gist",
        path: "https://fastly.jsdelivr.net/npm/@konghayao/vue-monaco-editor@1/dist/theme/githubGist.json",
        json: null,
    },
};

export const ThemeStore = {} as ThemeList & typeof extraTheme;
export type ThemeName = keyof AllTheme;
export type AllTheme = ThemeList & typeof extraTheme;
export async function initTheme() {
    if (Object.keys(ThemeStore).length === 0) {
        console.group("monaco theme: 加载情况");

        // 获取样式列表
        const files = await fetch(CDN.__themeCDN__ + "themelist.json").then<
            typeof Theme
        >((res) => res.json());
        console.log("样式 CDN 资源加载完成");
        //

        /** 转换 theme 为指定的样式 */
        const output = Object.entries(files).reduce((col, [key, value]) => {
            col[key] = {
                themeName: key,
                path: CDN.__themeCDN__ + value + ".json",
                json: null,
            };
            return col;
        }, {} as any);
        Object.assign(ThemeStore, output, extraTheme);
        console.groupEnd();
    }
    return ThemeStore;
}
/** 全局使用 Theme */
export const applyTheme = async (name: keyof AllTheme) => {
    if (name in ThemeStore && ThemeStore[name]?.json === null) {
        const { path } = ThemeStore[name];
        const json = await fetch(path, {
            cache: "force-cache",
        }).then((res) => res.json());

        window.monaco.editor.defineTheme(name, json);
        ThemeStore[name].json = json;
        window.monaco.editor.setTheme(name);
        console.log("MonacoEditor 应用样式 " + name);
    }
};
