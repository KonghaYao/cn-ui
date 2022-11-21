import { Atom, atom, OriginComponent } from '@cn-ui/use';
import { debounce } from 'lodash-es';
import { children as getChildren, Component, JSXElement, lazy, onMount } from 'solid-js';
import { AsyncComponent } from './AsyncComponent';
import { Anime, AnimeProps } from '@cn-ui/transition';

interface LazyLoadProps extends IntersectionObserverInit {
    fallback?: JSXElement;
    children?: JSXElement;
    load: Parameters<typeof lazy>[0];
    loading?: JSXElement;
    anime?: AnimeProps;
    once?: boolean;
}
export const LazyLoad = OriginComponent<LazyLoadProps, HTMLDivElement>((props) => {
    const fallback = getChildren(() => props.fallback);
    const visible = atom(false);
    let observer: IntersectionObserver;
    let ref: HTMLDivElement;
    onMount(() => {
        if (observer) observer.disconnect();
        // 处理用户手速太快划过去的问题
        const visibleDebounce = debounce(visible, 150) as any as Atom<boolean>;
        observer = new IntersectionObserver(([entries]) => {
            visibleDebounce(entries.isIntersecting);
        }, props);
        observer.observe(ref);
        props.once && observer.disconnect();
    });
    return (
        <div class={props.class()} style={props.style} ref={ref!}>
            <Anime {...props.anime}>
                {visible() ? (
                    <AsyncComponent
                        /** you will see Buttons after 1s  */
                        load={props.load}
                    >
                        {props.children}
                    </AsyncComponent>
                ) : (
                    fallback()
                )}
            </Anime>
        </div>
    );
});
