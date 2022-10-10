import { JSXElement, splitProps } from 'solid-js';
import './style/index.less';
import { MaskProps } from './interface';
import { extendsEvent, OriginComponent } from '@cn-ui/use';

/** @zh 将组件内部变为绝对定位, 可以配合 Position 实现角落位置 */
export const Mask = OriginComponent<MaskProps & { children: JSXElement }, HTMLDivElement>(
    (props) => {
        return (
            <div
                class={props.class('cn-mask relative')}
                classList={{}}
                style={props.style}
                ref={props.ref}
                {...extendsEvent(props)}
            >
                {props.children}
            </div>
        );
    }
);
