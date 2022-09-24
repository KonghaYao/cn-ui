import { Component } from 'solid-js';
import './Icon.css';
import { IconNames } from './IconNames';

/**
 * @zh 用于加载 Icon CSS，如果用户没有加载，那么将会在 Icon 第一次加载时加载
 * @param iconFontPath 覆盖内置的路径，可以更改为 cdn
 * @description 因为字体包在 Vite 中会被打包成 inline 造成 css 膨胀
 */
export const loadIcon = async (iconFontPath?: string) => {
    if (loaded) return true;
    return new Promise((res, rej) => {
        const path = iconFontPath || 'https://unpkg.com/@fontsource/material-icons/index.css';
        const link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        document.body.appendChild(link);
        link.onload = () => {
            loaded = true;
            res(true);
        };
        link.onerror = () => {
            rej(false);
        };
    });
};
let loaded = false;
/**
 * @zh 如果你在项目中不想使用我们提供的 CDN 加载方案，那么可以取消它，然后自己加载 CSS 文件
 *  */
export const ignoreAutoLoad = () => (loaded = true);
export const Icon: Component<{
    size?: string;
    name: IconNames;
    spin?: boolean;
}> = (props) => {
    if (!loaded) loadIcon();
    return (
        <nav
            class="cn-icon-font"
            classList={{
                'cn-icon-spin': props.spin ?? false,
            }}
            style={{ 'font-size': props.size }}
        >
            {props.name}
        </nav>
    );
};
