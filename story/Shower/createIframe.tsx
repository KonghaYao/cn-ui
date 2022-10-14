import { onCleanup, useContext } from 'solid-js';
import { wrap, windowEndpoint, releaseProxy, Remote } from 'comlink';
import { StoryContext, StoryControlContext } from '../StoryShower';

export const createIframe = (src: string) => {
    const { Props } = useContext(StoryContext);
    const { height, width, scale } = useContext(StoryControlContext);
    let cb = (any: any) => {};
    let api: Remote<{
        changeProps(any: any): void;
    }>;
    onCleanup(() => {
        api && api[releaseProxy]();
    });
    return (
        <iframe
            class="origin-center bg-white transition-transform"
            style={{
                height: height() + 'px',
                width: width() + 'px',
                transform: `scale(${scale() / 100})`,
            }}
            src={src}
            ref={(el) => {
                el.onload = () => {
                    api = wrap(windowEndpoint(el.contentWindow));
                    cb = api.changeProps;
                    cb(Props());

                    console.log('链接到 Book');
                };
            }}
        ></iframe>
    );
};
