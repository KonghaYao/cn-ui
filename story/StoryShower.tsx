import { createContext, createEffect, createMemo, useContext } from 'solid-js';
import { useStory } from './hook/useStory';
import { Dynamic } from 'solid-js/web';
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
import { wrap, windowEndpoint } from 'comlink';
export const StoryShower = () => {
    const [searchParams] = useSearchParams();
    const { Props, Content } = useContext(StoryContext);
    let cb = (any: any) => {};
    createEffect(() => {
        console.log(cb(Props()));
    });
    return (
        <main
            class="bg-grid flex-1"
            style={{
                overflow: 'auto',
            }}
        >
            <iframe
                src={'./book.html#/?path=' + searchParams.path}
                ref={(el) => {
                    el.onload = () => {
                        const api = wrap<{
                            changeProps(any: any): void;
                        }>(windowEndpoint(el.contentWindow));
                        cb = api.changeProps;
                        cb(Props());
                        console.log('链接到 Book');
                    };
                }}
            ></iframe>
            {/* <Dynamic component={Content()} {...Props()}></Dynamic> */}
        </main>
    );
};
