import { OriginComponent, genArray } from '@cn-ui/use';
import { JSXElement, createContext, useContext } from 'solid-js';

import './blink.css';
import { GlobalSize, ensureGet, hSizeStairs } from '../_util';
import { SkeletonParagraph } from './SkeletonParagraph';

export const SkeletonContext = createContext<{
    size?: GlobalSize;
}>();
export const Skeleton = OriginComponent<
    {
        children?: JSXElement;
        row?: number;
        size?: GlobalSize;
    },
    HTMLDivElement
>((props) => {
    return (
        <SkeletonContext.Provider value={{ size: props.size }}>
            <div
                ref={props.ref}
                class={props.class('cn-skeleton blink flex flex-col flex-wrap gap-4 p-2')}
                style={props.style}
            >
                {props.children ? (
                    props.children
                ) : typeof props.row === 'number' || typeof props.row === 'undefined' ? (
                    <>{genArray(props.row ?? 4).map((i) => SkeletonParagraph({}))}</>
                ) : null}
            </div>
        </SkeletonContext.Provider>
    );
});

export const SkeletonAvatar = OriginComponent((props) => {
    const context = useContext(SkeletonContext) ?? {};

    return (
        <div
            class={props.class(
                ensureGet<string>(hSizeStairs, context.size, 'h-8'),
                'aspect-square rounded-full bg-gray-200'
            )}
            style={props.style}
        ></div>
    );
});
import imageSvg from './image.svg?raw';
/** Image 需要自定义长宽，可以通过 class 指定 */
export const SkeletonImage = OriginComponent((props) => {
    return (
        <div
            class={props.class(' flex items-center justify-center bg-gray-200')}
            style={props.style}
            innerHTML={imageSvg}
        ></div>
    );
});
