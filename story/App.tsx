import { Component, createMemo, onMount } from 'solid-js';
import { ControllerGenerator } from './ControllerGenerator';
import { memo } from 'solid-js/web';
import { NavBar } from './NavBar';
import { Split } from '@cn-ui/split';
import { StoryShower } from './StoryShower';
import { StoryRoot } from './StoryRoot';

export const App = () => {
    return (
        <main class="flex flex-col bg-gray-50" id="app">
            <header class="HeaderFont  select-none bg-gray-800 px-8 py-1 text-xl ">
                <span class=" bg-gradient-to-r from-rose-100 to-teal-100 bg-clip-text text-3xl text-transparent">
                    Story Of CNUI
                </span>
            </header>
            <main class="bg-conic-to-r flex h-full flex-1 flex-row overflow-hidden from-indigo-200 via-slate-600 to-indigo-200">
                <NavBar></NavBar>

                <StoryRoot>
                    <StoryShower></StoryShower>
                    <ControllerGenerator></ControllerGenerator>
                </StoryRoot>
            </main>
        </main>
    );
};
