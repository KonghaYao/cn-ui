import { type JSX, createMemo } from "solid-js";
import { OriginComponent, type OriginComponentInputType } from "./OriginComponent";
import { extendsEvent } from "./extendsEvent";

export const extendsComponents = (props: any, override?: any) => {
    return {
        ...props,
        ref: (el: any) => {
            props.ref?.(el);
        },
        class: props.class(override?.class),
        style: props.style(override?.style),
        ...extendsEvent(props),
    };
};

/** 自动继承组件属性  */
export const OriginDiv = OriginComponent(
    <T, _RefType, ModelType>(
        props: OriginComponentInputType<
            {
                prop: OriginComponentInputType<T, HTMLDivElement, ModelType>;
            },
            HTMLDivElement
        >,
    ) => {
        const style = createMemo<JSX.CSSProperties>(() => {
            return { ...props.style(), ...props.prop.style() };
        });
        return (
            <div
                ref={(el) => {
                    props.prop.ref?.(el);
                    props.ref?.(el);
                }}
                class={props.prop.class("cn-div", props.class())}
                style={style()}
                {...extendsEvent(props)}
                {...extendsEvent(props.prop)}
            >
                {props.children}
            </div>
        );
    },
);
