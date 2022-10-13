import { Component, createMemo, onMount } from 'solid-js';
import { ControllerGenerator } from './ControllerGenerator';
import { useStory } from './hook/useStory';
import { Dynamic, memo } from 'solid-js/web';
import { NavBar } from './NavBar';
import { Split } from '@cn-ui/split';
export const App = () => {
    const { Props, Controller, Content } = useStory();

    return (
        <main class="flex flex-col bg-gray-50" id="app">
            <header class="HeaderFont  px-8 py-1 select-none text-xl bg-gray-800 ">
                <span class=" bg-clip-text text-transparent text-3xl bg-gradient-to-r from-rose-100 to-teal-100">
                    Story Of CNUI
                </span>
            </header>
            <main class="flex flex-row flex-1 h-full overflow-hidden bg-conic-to-r from-indigo-200 via-slate-600 to-indigo-200">
                <NavBar></NavBar>
                <main
                    class="flex-1 bg-grid"
                    style={{
                        overflow: 'auto',
                    }}
                >
                    <Dynamic component={Content()}></Dynamic>
                </main>
                <Split
                    class=" flex-1"
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                    }}
                    sizes={[75, 25]}
                    vertical
                >
                    <ControllerGenerator
                        controller={Controller()}
                        onChange={(name, value) => {
                            Props((props) => {
                                props[name] = value;
                                return { ...props };
                            });
                        }}
                    ></ControllerGenerator>
                </Split>
            </main>
        </main>
    );
};
