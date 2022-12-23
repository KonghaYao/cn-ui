import { useStory } from './hook/useStory';
import { Split } from '@cn-ui/split';
import { atom, reflect } from '@cn-ui/use';
import { useViewing } from './hook/useViewing';
import { StoryContext } from './StoryShower';

export const StoryRoot = (props) => {
    const { viewing } = useViewing();
    const href = reflect(() => {
        return './book.html#/?path=' + viewing().path;
    });
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
            <StoryContext.Provider
                value={{
                    ...useStory(),
                    viewing,
                    height: atom(667),
                    width: atom(375),
                    scale: atom(100),
                    autoRefresh: atom(false),
                    href,
                    refresh() {
                        href('./book.html#/?path=' + viewing().path + '&t=' + Date.now());
                    },
                }}
            >
                {props.children}
            </StoryContext.Provider>
        </Split>
    );
};
