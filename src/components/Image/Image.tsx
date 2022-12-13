import { JSX, JSXElement, mergeProps } from 'solid-js';

import { Icon } from '@cn-ui/core';
import { Box } from '@cn-ui/core';
import './style/index.css';
import { OriginComponent } from '@cn-ui/use';
import { extendsEvent } from '@cn-ui/use';
import { createAC } from '@cn-ui/headless';
import { resource } from '@cn-ui/use/src';
export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
export type ImagePosition = 'center' | 'top' | 'right' | 'bottom' | 'left' | string;
export interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string;

    fit?: ImageFit;
    position?: ImagePosition;
    round?: boolean;
    block?: boolean;
    width?: number;
    height?: number;
    radius?: number;

    iconSize?: number | string;
    showError?: boolean;
    showLoading?: boolean;
    errorIcon?: JSXElement;
    loadingIcon?: JSXElement;
    AC?: ReturnType<typeof createAC>;
}

export const Image = OriginComponent<ImageProps, HTMLDivElement>((props) => {
    const AC =
        props.AC ??
        createAC({
            loading() {
                return (
                    <Box
                        class="h-full w-full"
                        icon={<Icon name="refresh" size={props.iconSize}></Icon>}
                        subTitle="加载中"
                    ></Box>
                );
            },
            error() {
                return (
                    <Box
                        class="h-full w-full min-w-fit"
                        icon={<Icon name="picture_as_pdf" size={props.iconSize}></Icon>}
                        subTitle="图片加载错误"
                    ></Box>
                );
            },
        });
    props = mergeProps(
        {
            alt: 'This is an Image',
            fit: 'cover',
            showError: true,
            showLoading: true,
            iconSize: '1.5em',
        },
        props
    );
    const loadAtom = resource(() => {
        return new Promise((res, rej) => {
            const img = new window.Image();
            img.src = props.src;
            img.onload = () => {
                res(null);
            };
            img.onerror = (err) => rej;
        });
    });
    return (
        <span
            ref={props.ref}
            class={props.class('cn-image align-bottom')}
            classList={{
                round: props.round,
                loading: loadAtom.loading(),
                error: !!loadAtom.error(),
            }}
            style={{
                display: props.block ? 'block' : 'inline-block',
                height: props.height + 'px',
                width: props.width + 'px',
                ...props.style,
            }}
            {...extendsEvent(props)}
        >
            <AC resource={loadAtom}>
                {() => {
                    return (
                        <img
                            loading="lazy"
                            class="m-auto h-full "
                            src={props.src}
                            style={{
                                'object-fit': props.fit,
                                'object-position': props.position,
                            }}
                        />
                    );
                }}
            </AC>
        </span>
    );
});
