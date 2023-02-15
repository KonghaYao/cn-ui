import { createEffect, onCleanup, useContext } from 'solid-js';
import { wrap, windowEndpoint, releaseProxy, Remote } from 'comlink';
import { StoryContext } from './StoryRoot';
import { useEffectWithoutFirst } from '@cn-ui/use';

export const createIframe = () => {
    const { Props, height, width, scale, autoRefresh, refresh, href } = useContext(StoryContext)!;
    /** 传递参数 */
    let cb = (any: any) => {};
    let api: Remote<{
        changeProps(any: any): void;
    }>;
    let clear = () => {};
    useEffectWithoutFirst(() => {
        const data = Props();
        if (autoRefresh()) {
            refresh();
        } else {
            cb(data);
        }
    }, [Props]);
    onCleanup(() => {
        api && api[releaseProxy]();
        clear();
        /** @ts-ignore */
        api = undefined;
        /** @ts-ignore */
        cb = undefined;
        /** @ts-ignore */
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
            src={href()}
            ref={(iframe) => {
                iframe.onload = () => {
                    api = wrap(windowEndpoint(iframe.contentWindow!));
                    cb = api.changeProps;
                    api.changeProps(Props());
                };
                clear = () => {
                    iframe.src = 'about:blank';
                    try {
                        iframe.contentWindow!.document.write('');
                        iframe.contentWindow!.document.clear();
                    } catch (e) {
                        console.log(e);
                    }
                };
            }}
        ></iframe>
    );
};
