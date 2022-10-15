import { createContext, createEffect, createMemo, createUniqueId, useContext } from 'solid-js';
import { useStory } from './hook/useStory';

export const StoryContext = createContext<
    ReturnType<typeof useStory> &
        ReturnType<typeof useViewing> & {
            height: Atom<number>;
            width: Atom<number>;
            scale: Atom<number>;
            refresh: () => void;
        }
>();
import { Atom } from '@cn-ui/use';
import { createIframe } from './Shower/createIframe';
import { ResizeBar } from './Shower/ResizeBar';
import { useViewing } from './hook/useViewing';

export const StoryShower = () => {
    const { viewing } = useContext(StoryContext);
    createEffect(() => {
        console.log(viewing());
    });
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
                {/* 强制每次进行渲染 */}
                {createIframe('./book.html#/?path=' + viewing().path)}
            </div>
        </main>
    );
};
