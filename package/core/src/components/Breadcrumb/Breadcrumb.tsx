import { For, JSX, JSXElement } from 'solid-js';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Button } from '@cn-ui/core';
import { Atom } from '@cn-ui/use';
import { ButtonProps } from '../Button/interface';

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
    separator?: JSXElement;
    list: Atom<string[]>;
    buttonProps?: ButtonProps;
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
                            <Button
                                {...props.buttonProps}
                                onClick={() =>
                                    props.onTrigger &&
                                    props.onTrigger(props.list().slice(0, index() + 1), i, index())
                                }
                            >
                                {i}
                            </Button>
                        </>
                    );
                }}
            </For>
        </div>
    );
});
