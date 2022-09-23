import {
    Accessor,
    Component,
    createMemo,
    createResource,
    createSignal,
    For,
} from "solid-js";
import { Dynamic } from "solid-js/web";
import Index from "../src/story.index.json";
import { ControllerGenerator } from "./ControllerGenerator";

export const App = () => {
    const [page, setPage] = createSignal<string>(Index[0]);
    const [props, setProps] = createSignal({});
    const [Controller, setController] = createSignal([]);
    const [Content, { refetch }] = createResource<Component<any>>(async () => {
        return import(/* @vite-ignore */ page()).then((module) => {
            const props =
                module.Controller.reduce((col, cur) => {
                    col[cur.prop] = cur.default;
                    return col;
                }, {}) || {};
            setProps(props);
            setController(module.Controller);
            return module.default;
        });
    });

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
                                        setPage(i);
                                        refetch();
                                    }}>
                                    {i}
                                </div>
                            );
                        }}
                    </For>
                </nav>
                <div class="col flex-1">
                    <main class="flex-1">
                        <Dynamic component={Content()} {...props()}></Dynamic>
                    </main>
                    <nav class="flex-1">
                        <ControllerGenerator
                            controller={Controller()}
                            onChange={(name, value) => {
                                setProps((props) => {
                                    props[name] = value;
                                    return { ...props };
                                });
                            }}></ControllerGenerator>
                    </nav>
                </div>
            </main>
        </main>
    );
};
