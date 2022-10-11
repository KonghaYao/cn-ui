import { For } from 'solid-js';
import Index from '../src/story.index.json';
import { ControllerGenerator } from './ControllerGenerator';
import { useNavigate, useSearchParams } from '@solidjs/router';
import { useStory } from './useStory';
import { Dynamic } from 'solid-js/web';
// import 'animate.css';
export const App = () => {
    const { Props, Controller, refreshStory, Content } = useStory();
    const [_, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    return (
        <main class="flex flex-col" id="app">
            <header>StoryBook </header>
            <main class="flex flex-row flex-1">
                <nav>
                    <For each={Index}>
                        {(i) => {
                            return (
                                <div
                                    onclick={() => {
                                        setSearchParams({ path: i });
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
                        <Dynamic component={Content()} {...Props()}></Dynamic>
                    </main>
                    <nav>
                        <ControllerGenerator
                            controller={Controller()}
                            onChange={(name, value) => {
                                Props((props) => {
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
