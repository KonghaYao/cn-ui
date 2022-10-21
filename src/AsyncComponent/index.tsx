import { Component, JSXElement, lazy, Suspense } from 'solid-js';

export const AsyncComponent: Component<{
    fallback?: JSXElement;
    children?: () => Promise<Component<unknown>>;
}> = (props) => {
    const Async = lazy(async () => {
        return {
            default: await props.children(),
        };
    });
    return (
        <Suspense fallback={props.fallback}>
            <Async></Async>
        </Suspense>
    );
};
