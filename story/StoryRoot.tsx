import { useStory } from './hook/useStory';
import { Split } from '@cn-ui/split';
import { atom } from '@cn-ui/use';
import { useViewing } from './hook/useViewing';
import { StoryContext } from './StoryShower';

export const StoryRoot = (props) => {
    const { viewing } = useViewing();
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
                    height: atom(512),
                    width: atom(512),
                    scale: atom(100),
                    refresh() {
                        const data = viewing();
                        viewing({ path: data.path, code: data.code });
                    },
                }}
            >
                {props.children}
            </StoryContext.Provider>
        </Split>
    );
};
