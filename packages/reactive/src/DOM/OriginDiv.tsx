import { OriginComponent, OriginComponentInputType } from './OriginComponent'
import { extendsEvent } from './extendsEvent'
/** 自动继承组件属性  */
export const OriginDiv = OriginComponent(
    <T, _RefType, ModelType>(
        props: OriginComponentInputType<
            {
                prop: OriginComponentInputType<T, HTMLDivElement, ModelType>
            },
            HTMLDivElement
        >
    ) => {
        return (
            <div
                ref={(el) => {
                    props.prop.ref && props.prop.ref(el)
                    props.ref && props.ref(el)
                }}
                class={props.prop.class('cn-origin-div', props.class())}
                style={{ ...props.style, ...props.prop.style }}
                {...extendsEvent(props)}
                {...extendsEvent(props.prop)}
            >
                {props.children}
            </div>
        )
    }
)
