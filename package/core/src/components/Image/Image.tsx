import { ErrorBoundary, JSX, JSXElement, mergeProps } from 'solid-js';

import './style/index.css';
import { OriginComponent, atom, extendsEvent } from '@cn-ui/use';
import { createAC } from '@cn-ui/headless';
import { resource } from '@cn-ui/use';
import { Box } from '../Box';
import { Icon } from '../Icon';
import { Skeleton, SkeletonImage } from '../Skeleton';
import { Button } from '../Button';
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

export const Image = OriginComponent<ImageProps, HTMLImageElement>((props) => {
    const AC =
        props.AC ??
        createAC({
            loading() {
                return (
                    <Skeleton
                        style={{
                            'flex-direction': 'row',
                        }}
                    >
                        <SkeletonImage></SkeletonImage>
                    </Skeleton>
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
    let image = atom<{ res: Function; rej: Function }>(null);

    const loadAtom = resource(() => {
        return new Promise((res, rej) => {
            image({ res, rej });
        });
    });
    return (
        <span
            class={props.class('cn-image relative align-bottom')}
            {...extendsEvent(props)}
            style={props.style}
        >
            <img
                height={props.height}
                width={props.width}
                {...props}
                // ref={props.ref}
                class="m-auto h-full "
                src={props.src}
                style={{
                    'object-fit': props.fit,
                    'object-position': props.position,
                }}
                onload={() => {
                    image()?.res();
                }}
                onerror={(err) => {
                    image().rej(err);
                }}
            />
            <nav class="absolute top-0 left-0 flex h-full w-full ">
                <AC resource={loadAtom}>{() => null}</AC>
            </nav>
        </span>
    );
});
