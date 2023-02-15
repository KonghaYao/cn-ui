import { Split } from '@cn-ui/split';
import { Atom, atom, reflect } from '@cn-ui/use';
import { Component, JSXElement, createContext } from 'solid-js';

export const StoryContext = createContext<
    ReturnType<typeof useStory> & {
        viewing: Atom<{ path: string; code: string }>;
        height: Atom<number>;
        width: Atom<number>;
        scale: Atom<number>;
        href: Atom<string>;
        autoRefresh: Atom<boolean>;
        refresh: () => void;
    }
>();

const useStory = () => {
    return {
        Props: atom({}),
    };
};

export const StoryRoot: Component<{
    children: JSXElement;
    viewing: { path: string; code: string };
}> = (props) => {
    const viewing = atom(props.viewing);
    const href = reflect(() => {
        return '/runtime/' + viewing().path;
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
                        href('/runtime/' + viewing().path + '?t=' + Date.now());
                    },
                }}
            >
                {props.children}
            </StoryContext.Provider>
        </Split>
    );
};
