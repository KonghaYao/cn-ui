import { createContext, createEffect, createMemo, createUniqueId } from 'solid-js';
import { useStory } from './hook/useStory';
import { Split } from '@cn-ui/split';
import { useSearchParams } from '@solidjs/router';

export const StoryContext = createContext<ReturnType<typeof useStory>>();
export const StoryRoot = (props) => {
    const Result = useStory();
    return (
        <Split
            class=" flex-1"
            style={{
                width: '100%',
                overflow: 'hidden',
            }}
            sizes={[75, 25]}
            vertical
        >
            <StoryContext.Provider value={Result}>{props.children}</StoryContext.Provider>
        </Split>
    );
};
import { atom, Atom } from '@cn-ui/use';
import { createIframe } from './Shower/createIframe';
import { ResizeBar } from './Shower/ResizeBar';
export const StoryControlContext = createContext<{
    height: Atom<number>;
    width: Atom<number>;
    scale: Atom<number>;
}>();

export const StoryShower = () => {
    const [searchParams] = useSearchParams();

    return (
        <main class="flex flex-1 flex-col overflow-hidden">
            <StoryControlContext.Provider
                value={{
                    height: atom(512),
                    width: atom(512),
                    scale: atom(100),
                }}
            >
                <div class="bg-white shadow-md">
                    <ResizeBar></ResizeBar>
                </div>
                <div
                    class="bg-grid flex-1"
                    style={{
                        overflow: 'auto',
                    }}
                >
                    {/* 这样子强制每次进行渲染 */}
                    {createIframe('./book.html#/?path=' + searchParams.path)}
                </div>
            </StoryControlContext.Provider>
        </main>
    );
};
