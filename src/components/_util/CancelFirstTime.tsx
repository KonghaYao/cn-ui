import { Accessor, Component, createMemo, JSXElement, Show } from 'solid-js';

export const CancelFirstRender: Component<{
    children: JSXElement;
    trigger: Accessor<boolean>;
}> = (P) => {
    let firstTime = true;

    const render = createMemo(() => {
        console.log(firstTime);
        if (!firstTime) return true;
        if (P.trigger()) return true; // 如果true，那么必然会渲染

        // 隐藏的时候，判断第一次，如果为第一次则删除
        if (firstTime) {
            firstTime = false;
            console.log('阻止第一次渲染');
            return false;
        }
    });
    return (
        <>
            <Show when={render()}>{P.children}</Show>
        </>
    );
};
