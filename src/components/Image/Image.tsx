import { JSX, JSXElement, Match, mergeProps, Switch } from 'solid-js';
import { atom } from '@cn-ui/use';
import { Icon } from '@cn-ui/core';
import { Box } from '@cn-ui/core';
import './style/index.css';
import { OriginComponent } from '@cn-ui/use';
import { extendsEvent } from '@cn-ui/use';
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
}

export const Image = OriginComponent<ImageProps, HTMLDivElement>((props) => {
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
    const error = atom(false);
    const loading = atom(true);
    return (
        <span
            ref={props.ref}
            class={props.class('cn-image align-bottom')}
            classList={{
                round: props.round,
                loading: loading(),
                error: error(),
            }}
            style={{
                display: props.block ? 'block' : 'inline-block',
                height: props.height + 'px',
                width: props.width + 'px',
                ...props.style,
            }}
            {...extendsEvent(props)}
        >
            <Switch>
                <Match when={props.showLoading && loading()}>
                    <Box
                        icon={<Icon name="refresh" size={props.iconSize}></Icon>}
                        subTitle="加载中"
                    ></Box>
                </Match>
                <Match when={props.showError && error()}>
                    <Box
                        icon={<Icon name="error" size={props.iconSize}></Icon>}
                        subTitle="图片加载错误"
                    ></Box>
                </Match>
            </Switch>

            {!error() && (
                <img
                    loading="lazy"
                    class="m-auto h-full "
                    src={props.src}
                    style={{
                        'object-fit': props.fit,
                        'object-position': props.position,
                    }}
                    onLoad={() => loading(false)}
                    onError={() => {
                        loading(false);
                        error(true);
                    }}
                />
            )}
        </span>
    );
});
