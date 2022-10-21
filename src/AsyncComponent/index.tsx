import { Component, createContext, JSXElement, lazy, Suspense, useContext } from 'solid-js';

const AsyncComponentContext = createContext<{
    Comp: Component;
}>();
/**
 * @zh 配合 AsyncComponent 进行使用的组件，用于外包层传递数据
 *   */
export const AsyncOutlet = (props) => {
    const { Comp } = useContext(AsyncComponentContext);

    return <Comp {...props}></Comp>;
};

type AsyncComponent = <T>(props: {
    fallback?: JSXElement;
    load?: () => T | Promise<T>;
    slot?: keyof T;
    children?: JSXElement;
}) => JSXElement;
/** @zh 异步加载组件，在异步完成前使用 fallback */
export const AsyncComponent: AsyncComponent = (props) => {
    const Async = lazy(async () => {
        const module = await props.load();
        /** @ts-ignore */
        const Comp = module[props.slot ?? 'default'];
        return {
            default: () => (
                <AsyncComponentContext.Provider
                    value={{
                        Comp,
                    }}
                >
                    {props.children ?? <AsyncOutlet></AsyncOutlet>}
                </AsyncComponentContext.Provider>
            ),
        };
    });
    return (
        <Suspense fallback={props.fallback}>
            <Async></Async>
        </Suspense>
    );
};
