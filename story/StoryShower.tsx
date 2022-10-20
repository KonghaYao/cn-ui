import { batch, createContext, createDeferred, createEffect, Show, useContext } from 'solid-js';
import { useStory } from './hook/useStory';

export const StoryContext = createContext<
    ReturnType<typeof useStory> &
        ReturnType<typeof useViewing> & {
            height: Atom<number>;
            width: Atom<number>;
            scale: Atom<number>;
            href: Atom<string>;
            autoRefresh: Atom<boolean>;
            refresh: () => void;
        }
>();
import { atom, Atom } from '@cn-ui/use';
import { createIframe } from './Shower/createIframe';
import { ResizeBar } from './Shower/ResizeBar';
import { useViewing } from './hook/useViewing';

export const StoryShower = () => {
    const { href } = useContext(StoryContext);
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
                {createIframe(
                    /* 传入参数可以强制每次进行渲染 */
                    /** @ts-ignore */
                    href()
                )}
            </div>
        </main>
    );
};
