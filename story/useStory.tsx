import { batch, Component, createMemo, createResource, createSignal } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import Index from '../src/story.index.json';
import { useLocation } from '@solidjs/router';

export const useStory = () => {
    const location = useLocation();
    /** 注入组件的参数 */
    const [props, setProps] = createSignal({});
    /** 组件的表单选择器 */
    const [Controller, setController] = createSignal([]);
    const [Content, { refetch }] = createResource<Component<any>>(async () => {
        return import(
            /* @vite-ignore */ new URLSearchParams(location.search).get('path') || Index[0]
        ).then((module) => {
            batch(() => {
                setController(module.Controller || []);
                const props =
                    module.Controller.reduce((col, cur) => {
                        col[cur.prop] = cur.default;
                        return col;
                    }, {}) || {};
                setProps(props);
            });
            return module.default;
        });
    });
    /** 展示 Story 组件的一个东西 */
    const ContentComp = createMemo(() => {
        // * 维持依赖追踪
        const p = props();
        return <Dynamic component={Content()} {...p}></Dynamic>;
    });
    return {
        updateProps: setProps,
        ContentComp,
        Controller,
        refreshStory: refetch,
        Content,
    };
};
