import { createEffect, onCleanup, useContext } from 'solid-js';
import { wrap, windowEndpoint, releaseProxy, Remote } from 'comlink';
import { StoryContext, StoryControlContext } from '../StoryShower';

export const createIframe = (src: string) => {
    const { Props } = useContext(StoryContext);
    const { height, width, scale } = useContext(StoryControlContext);
    let cb = (any: any) => {};
    let api: Remote<{
        changeProps(any: any): void;
    }>;
    let clear = () => {};
    createEffect(() => {
        cb(Props());
    });
    onCleanup(() => {
        api && api[releaseProxy]();
        clear();
        api = undefined;
        cb = undefined;
        clear = undefined;
        console.log('组件卸载完成');
    });
    return (
        <iframe
            class="m-auto origin-center bg-white transition-transform"
            style={{
                height: height() + 'px',
                width: width() + 'px',
                transform: `scale(${scale() / 100})`,
            }}
            src={src}
            ref={(iframe) => {
                iframe.onload = () => {
                    api = wrap(windowEndpoint(iframe.contentWindow));
                    cb = api.changeProps;
                    cb(Props());
                };
                clear = () => {
                    iframe.src = 'about:blank';
                    try {
                        iframe.contentWindow.document.write('');
                        iframe.contentWindow.document.clear();
                    } catch (e) {
                        console.log(e);
                    }
                };
            }}
        ></iframe>
    );
};
