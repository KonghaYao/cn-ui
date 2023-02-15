import { batch, createContext, createDeferred, createEffect, Show, useContext } from 'solid-js';
import { createIframe } from './createIframe';
import { ResizeBar } from './ResizeBar';
import { StoryContext } from './StoryRoot';

export const StoryShower = () => {
    const { href } = useContext(StoryContext)!;
    const iframe = createIframe(
        /* 传入参数可以强制每次进行渲染 */
        /** @ts-ignore */
        href()
    );
    return (
        <main class="flex flex-1 flex-col overflow-hidden">
            <div class="bg-white shadow-md">
                <ResizeBar></ResizeBar>
            </div>
            <div
                class="bg-grid flex-1"
                style={{
                    overflow: 'auto',
                }}
            >
                {iframe}
            </div>
        </main>
    );
};
