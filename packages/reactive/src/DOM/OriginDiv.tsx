import { createMemo, JSX } from 'solid-js'
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
        const style = createMemo<JSX.CSSProperties>(() => {
            return { ...props.style(), ...props.prop.style() }
        })
        return (
            <div
                ref={(el) => {
                    props.prop.ref && props.prop.ref(el)
                    props.ref && props.ref(el)
                }}
                class={props.prop.class('cn-origin-div', props.class())}
                style={style()}
                {...extendsEvent(props)}
                {...extendsEvent(props.prop)}
            >
                {props.children}
            </div>
        )
    }
)
