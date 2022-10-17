import { JSX, JSXElement } from 'solid-js';
import { extendsEvent, OriginComponent } from '@cn-ui/use';

export interface RelativeProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    fixed?: boolean;
}
/** @zh 将组件内部变为绝对定位, 可以配合 Position 实现角落位置 */
export const Relative = OriginComponent<RelativeProps, HTMLDivElement>((props) => {
    return (
        <div
            class={props.class('cn-relative', props.fixed ? 'fixed' : 'relative')}
            classList={{}}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            {props.children}
        </div>
    );
});
