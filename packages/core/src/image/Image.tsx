import { type JSX, Show, mergeProps } from "solid-js";

import {
    type JSXSlot,
    OriginComponent,
    atom,
    computed,
    ensureFunctionResult,
    extendsEvent,
} from "@cn-ui/reactive";
export type ImageFit = "contain" | "cover" | "fill" | "none" | "scale-down";
export type ImagePosition = "center" | "top" | "right" | "bottom" | "left" | string;
export interface ImageProps extends JSX.HTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fit?: ImageFit;
    position?: ImagePosition;
    round?: boolean;
    block?: boolean;
    width?: number;
    height?: number;

    /**
     * @example [
     *    [
     *        "https://plus.unsplash.com/premium_photo-1674939148088-d71acc1541ff?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
     *        100,
     *    ],
     *    [
     *        "https://plus.unsplash.com/premium_photo-1674939148088-d71acc1541ff?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8",
     *        200,
     *    ],
     * ]
     */
    srcSets?: [string, number][];
    radius?: number;
    fallback?: string | JSXSlot;
}

/**
 * 图片预设组件
 */
export const Image = OriginComponent<ImageProps, HTMLImageElement>((props) => {
    props = mergeProps(
        {
            alt: "This is an Image",
            fit: "cover" as ImageFit,
        },
        props,
    );
    const srcSets = computed(() =>
        props.srcSets
            ?.map(([src, size], index) => {
                if (index === props.srcSets!.length - 1) return `${src} ${size}w`;
                return `${src} ${size - 1}w`;
            })
            .join(","),
    );
    const sizes = computed(() =>
        props.srcSets
            ?.map(([_, size], index) => {
                if (index === props.srcSets!.length - 1) {
                    return `${size}px`;
                }
                return `(max-width: ${size}px) ${size - 1}px`;
            })
            .join(","),
    );
    const isError = atom(false);
    const isStringFallback = computed(() => typeof props.fallback === "string");
    return (
        <>
            {/* biome-ignore lint/a11y/useAltText: <explanation> */}
            <img
                height={props.height}
                width={props.width}
                class={props.class(
                    "cn-image m-auto h-full",
                    isError() && !isStringFallback() && "hidden",
                )}
                style={{
                    ...props.style,
                    "object-fit": props.fit,
                    "object-position": props.position,
                }}
                src={isError() && isStringFallback() ? (props.fallback as string) : props.src}
                sizes={sizes()}
                srcset={srcSets()}
                alt={props.alt}
                {...extendsEvent(props)}
                /** @ts-ignore */
                on:error={() => {
                    isError(true);
                }}
            />
            <Show when={isError() && !isStringFallback()}>
                {ensureFunctionResult(props.fallback)}
            </Show>
        </>
    );
});
