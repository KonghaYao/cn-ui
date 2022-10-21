import { Atom, atom } from '@cn-ui/use';
import { Component, createContext, JSXElement, lazy, Suspense, useContext } from 'solid-js';

const AsyncComponentContext = createContext<{
    Comp: Component;
}>();
export const AsyncOutlet = (props) => {
    const { Comp } = useContext(AsyncComponentContext);

    return <Comp {...props}></Comp>;
};

type AsyncComponent = <T>(props: {
    fallback?: JSXElement;
    load?: () => T | Promise<T>;
    slot?: keyof T;
    children: JSXElement;
}) => JSXElement;
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
                    {props.children}
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
