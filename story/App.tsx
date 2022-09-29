import { Accessor, createEffect, For } from 'solid-js';
import Index from '../src/story.index.json';
import { ControllerGenerator } from './ControllerGenerator';
import { useNavigate } from '@solidjs/router';
import { useStory } from './useStory';
// import 'animate.css';
export const App = () => {
    const { updateProps, ContentComp, Controller, refreshStory, Content } = useStory();

    const navigate = useNavigate();
    return (
        <main class="flex flex-col" id="app">
            <header>StoryBook</header>
            <main class="flex flex-row flex-1">
                <nav>
                    <For each={Index}>
                        {(i) => {
                            return (
                                <div
                                    onclick={() => {
                                        navigate('/path?path=' + i);
                                        refreshStory();
                                    }}
                                >
                                    {i}
                                </div>
                            );
                        }}
                    </For>
                </nav>
                <div
                    class="flex flex-col flex-1"
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
                                updateProps((props) => {
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
