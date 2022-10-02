import { Component, createMemo } from 'solid-js';
import './style/index.css';

import { loadLink } from '../_util/loadLink';
import { IconProps } from './interface';
import { OriginComponent } from '../_util/OriginComponent';
import { classNames } from '@cn-ui/use';
import { PropsToAttr } from '@cn-ui/use';
/**
 * @zh 用于加载 Icon CSS，如果用户没有加载，那么将会在 Icon 第一次加载时加载
 * @param iconFontPath 覆盖内置的路径，可以更改为 cdn
 * @description 因为字体包在 Vite 中会被打包成 inline 造成 css 膨胀
 */
export const loadIcon = async (iconFontPath?: string) => {
    if (loaded) return true;
    loaded = true;
    const path =
        iconFontPath || 'https://fastly.jsdelivr.net/npm/@fontsource/material-icons/index.css';
    return loadLink(path)
        .then((res) => {
            return res;
        })
        .catch(() => {
            loaded = false;
        });
};
export let loaded = false;
/**
 * @zh 如果你在项目中不想使用我们提供的 CDN 加载方案，那么可以取消它，然后自己加载 CSS 文件
 *  */
export const ignoreAutoLoad = () => (loaded = true);

export const Icon = OriginComponent<IconProps, HTMLElement>((props) => {
    if (!loaded) loadIcon();
    const fontSize = createMemo(() => {
        return typeof props.size === 'number' ? props.size + 'px' : props.size;
    });
    return (
        <nav
            ref={props.ref}
            class={props.class('cn-icon-font inline-block select-none leading-none origin-center', {
                spin: props.spin ?? false,
            })}
            style={{ ...props.style, 'font-size': fontSize() }}
        >
            {props.name}
        </nav>
    );
});
