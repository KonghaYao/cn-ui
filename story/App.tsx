import { For } from 'solid-js';
import Index from '../src/story.index.json';
import { ControllerGenerator } from './ControllerGenerator';
import { useNavigate, useSearchParams } from '@solidjs/router';
import { useStory } from './useStory';
import { Dynamic } from 'solid-js/web';
import { Button } from '../src/components/Button';
import { Space } from '../src/components/Space';
import { Box } from '../src/components/Box';

const NavBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <Space vertical class="overflow-auto py-4 px-2 scroll-box-none">
            <For each={Index}>
                {(i) => {
                    return (
                        <Button
                            class="w-full transition-colors"
                            type={searchParams.path === i ? 'primary' : 'text'}
                            onClick={() => {
                                setSearchParams({ path: i });
                            }}
                        >
                            {i.replace(/.*\/(.*?).story.tsx$/, '$1')}
                        </Button>
                    );
                }}
            </For>
        </Space>
    );
};

// import 'animate.css';
export const App = () => {
    const { Props, Controller, refreshStory, Content } = useStory();

    return (
        <main class="flex flex-col" id="app">
            <header class="bg-blue-400 text-white px-8 py-2 select-none text-xl">
                Story Of CNUI
            </header>
            <main class="flex flex-row flex-1 h-full overflow-hidden">
                <NavBar></NavBar>

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
