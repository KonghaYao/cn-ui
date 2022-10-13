import { createContext, useContext } from 'solid-js';
import { useStory } from './hook/useStory';
import { Dynamic } from 'solid-js/web';
import { Split } from '@cn-ui/split';

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
export const StoryShower = () => {
    const { Content } = useContext(StoryContext);
    return (
        <main
            class="bg-grid flex-1"
            style={{
                overflow: 'auto',
            }}
        >
            <Dynamic component={Content()}></Dynamic>
        </main>
    );
};
