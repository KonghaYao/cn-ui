import { Atom, atom, OriginComponent, resource } from '@cn-ui/use';
import { debounce } from 'lodash-es';
import {
    children as getChildren,
    Component,
    createEffect,
    JSXElement,
    lazy,
    onMount,
    Show,
    Suspense,
} from 'solid-js';
import { Anime, AnimeProps } from '@cn-ui/transition';

interface LazyLoadProps extends IntersectionObserverInit {
    fallback?: JSXElement;
    children?: JSXElement;
    load: () => Promise<Component>;
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
    });
    props.once &&
        createEffect(() => {
            visible() && observer && observer.disconnect();
        });
    return (
        <div class={props.class()} style={props.style} ref={ref}>
            <Anime {...props.anime}>
                <Show when={visible()} fallback={fallback}>
                    <Suspense fallback={props.loading}>
                        {lazy(async () => {
                            return { default: await props.load() };
                        })({})}
                    </Suspense>
                </Show>
            </Anime>
        </div>
    );
});
