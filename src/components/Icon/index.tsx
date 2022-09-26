import { Component } from 'solid-js';
import './style/index.css';

import { loadLink } from '../_util/loadLink';
import { IconProps } from './interface';
/**
 * @zh 用于加载 Icon CSS，如果用户没有加载，那么将会在 Icon 第一次加载时加载
 * @param iconFontPath 覆盖内置的路径，可以更改为 cdn
 * @description 因为字体包在 Vite 中会被打包成 inline 造成 css 膨胀
 */
export const loadIcon = async (iconFontPath?: string) => {
    if (loaded) return true;
    const path = iconFontPath || 'https://unpkg.com/@fontsource/material-icons/index.css';
    return loadLink(path).then((res) => {
        loaded = true;
        return res;
    });
};
export let loaded = false;
import cs from '../_util/classNames';
/**
 * @zh 如果你在项目中不想使用我们提供的 CDN 加载方案，那么可以取消它，然后自己加载 CSS 文件
 *  */
export const ignoreAutoLoad = () => (loaded = true);
export const Icon: Component<IconProps> = (props) => {
    if (!loaded) loadIcon();
    return (
        <nav
            style={{ 'font-size': typeof props.size === 'number' ? props.size + 'px' : props.size }}
            {...props}
            class={cs('cn-icon-font', props.class)}
            classList={{
                spin: props.spin ?? false,
            }}
        >
            {props.name}
        </nav>
    );
};
