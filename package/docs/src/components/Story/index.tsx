import { Component } from 'solid-js';
import { StoryRoot } from './StoryRoot';
import { StoryShower } from './StoryShower';
export const Story: Component<{
    code: string;
    path: string;
}> = (props) => {
    return (
        <StoryRoot
            viewing={{
                ...props,
            }}
        >
            <StoryShower></StoryShower>
            {/* <!-- <ControllerGenerator></ControllerGenerator> --> */}
        </StoryRoot>
    );
};
