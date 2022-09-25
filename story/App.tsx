import {
    Accessor,
    batch,
    Component,
    createEffect,
    createMemo,
    createResource,
    createSignal,
    For,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import Index from '../src/story.index.json';
import { ControllerGenerator } from './ControllerGenerator';
import { useParams, useNavigate, useLocation } from '@solidjs/router';
export const App = () => {
    const location = useLocation();
    const [props, setProps] = createSignal({});

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
    const ContentComp = createMemo(() => {
        // * 维持依赖追踪
        const p = props();
        return <Dynamic component={Content()} {...p}></Dynamic>;
    });
    const navigate = useNavigate();
    return (
        <main class="col" id="app">
            <header>StoryBook</header>
            <main class="row flex-1">
                <nav>
                    <For each={Index}>
                        {(i) => {
                            return (
                                <div
                                    onclick={() => {
                                        navigate('/path?path=' + i);
                                        refetch();
                                    }}
                                >
                                    {i}
                                </div>
                            );
                        }}
                    </For>
                </nav>
                <div
                    class="col flex-1"
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    <main
                        class="flex-1"
                        style={{
                            overflow: 'auto',
                            'max-height': '80vh',
                        }}
                    >
                        {Content.loading ? '加载中' : ContentComp()}
                    </main>
                    <nav>
                        <ControllerGenerator
                            controller={Controller()}
                            onChange={(name, value) => {
                                setProps((props) => {
                                    props[name] = value;
                                    return { ...props };
                                });
                            }}
                        ></ControllerGenerator>
                    </nav>
                </div>
            </main>
        </main>
    );
};
