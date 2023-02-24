import { Component } from 'solid-js';
import { OriginComponent, OriginComponentInputType, OriginComponentOutputType } from '@cn-ui/use';

export type getOriginInputFromComp<T> = T extends Component<
    OriginComponentOutputType<infer Info, any>
>
    ? Info
    : unknown;
export type getOriginRefFromComp<T> = T extends Component<
    OriginComponentOutputType<any, infer Info>
>
    ? Info
    : unknown;

/**
 * 创建一个组件中间键，你可以改动 props 属性
 * @move 这个将会移动到 use 库
 */
export function createMiddleware<P extends Object, D extends Object>(
    middleware: (props: OriginComponentInputType<P, HTMLElement>) => D
) {
    return <
        T extends Component<OriginComponentOutputType<unknown, unknown>>,
        Ref = getOriginRefFromComp<T>,
        Info = getOriginInputFromComp<T>
    >(
        Element: T
    ) =>
        OriginComponent<Info & P, Ref>((props) => {
            /** @ts-ignore  只是一个小小的继承识别错误 */
            const newProps = middleware(props);
            return <Element {...props} {...newProps}></Element>;
        });
}
