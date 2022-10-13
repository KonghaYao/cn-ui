import { createContext, useContext } from 'solid-js';
import { useStory } from './hook/useStory';
import { Dynamic } from 'solid-js/web';

export const StoryContext = createContext<ReturnType<typeof useStory>>();
export const StoryRoot = (props) => {
    const Result = useStory();
    return <StoryContext.Provider value={Result}>{props.children}</StoryContext.Provider>;
};
export const StoryShower = () => {
    const { Content } = useContext(StoryContext);
    return (
        <main
            class="flex-1 bg-grid"
            style={{
                overflow: 'auto',
            }}
        >
            <Dynamic component={Content()}></Dynamic>
        </main>
    );
};
