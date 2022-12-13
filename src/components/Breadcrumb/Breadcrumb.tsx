import { For, JSX, JSXElement } from 'solid-js';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Atom } from '@cn-ui/use';

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
    separator?: JSXElement;
    list: Atom<string[]>;
    onTrigger?: (before: string[], text: string, index: number) => void;
}

export const Breadcrumb = OriginComponent<BreadcrumbProps>((props) => {
    return (
        <div
            class={props.class(
                'flex cursor-pointer items-center gap-2 rounded-lg px-4 py-1 text-slate-400'
            )}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <For each={props.list()}>
                {(i, index) => {
                    return (
                        <>
                            {index() === 0 ? null : typeof props.separator === 'string' ? (
                                <span>{props.separator}</span>
                            ) : (
                                props.separator ?? <span>{'/'}</span>
                            )}
                            <div
                                class="text-blue-600 "
                                onClick={() =>
                                    props.onTrigger &&
                                    props.onTrigger(props.list().slice(0, index() + 1), i, index())
                                }
                            >
                                {i}
                            </div>
                        </>
                    );
                }}
            </For>
        </div>
    );
});
