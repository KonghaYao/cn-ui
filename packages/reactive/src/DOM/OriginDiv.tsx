import { OriginComponentInputType } from './OriginComponent';
import { extendsEvent } from './extendsEvent';
import { JSXElement } from 'solid-js';

/** 自动继承组件属性  */
export const OriginDiv = <T, RefType = HTMLElement, ModelType = string>(props: { prop: OriginComponentInputType<T, RefType, ModelType>; children?: JSXElement }) => {
    return (
        <div ref={(el) => props.prop.ref && props.prop.ref(el as RefType)} class={props.prop.class('cn-sortable')} style={props.prop.style} {...extendsEvent(props.prop)}>
            {props.children}
        </div>
    );
};
