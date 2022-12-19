import { JSX, JSXElement, splitProps } from 'solid-js';
import './style/index.css';

import { extendsEvent, OriginComponent } from '@cn-ui/use';
export interface MaskProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    url?: string;
    hexagon?: boolean;
    squircle?: boolean;
}
/** @zh 遮罩切割，可以切割为指定形状 */
export const Mask = OriginComponent<MaskProps, HTMLDivElement>((props) => {
    return (
        <span
            class={props.class(
                'cn-mask',
                props.squircle && 'mask-squircle',
                props.hexagon && 'mask-hexagon'
            )}
            style={Object.assign(
                props.url
                    ? {
                          //! CSS Bug 直接使用 mask-image 属性无法下载到图片
                          '--mask-image': `url('${props.url}')`,
                      }
                    : {},
                props.style
            )}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            {props.children}
        </span>
    );
});
