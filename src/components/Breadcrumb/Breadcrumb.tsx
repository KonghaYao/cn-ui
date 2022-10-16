import { JSX, JSXElement } from 'solid-js';
import { extendsEvent, OriginComponent } from '@cn-ui/use';
import { Atom } from '@cn-ui/use';
import { Button } from '@cn-ui/core';

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
    separator?: JSXElement;
    list: Atom<string[]>;
    onTrigger?: (index: number) => void;
}

export const Breadcrumb = OriginComponent<BreadcrumbProps>((props) => {
    return (
        <div
            class={props.class(
                'flex cursor-pointer items-center rounded-lg px-4 py-1 text-slate-400'
            )}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            {props.list().map((i, index) => {
                return (
                    <>
                        {index === 0 ? null : props.separator ?? <span>{'/'}</span>}
                        <Button
                            size="mini"
                            text
                            onClick={() => props.onTrigger && props.onTrigger(index)}
                        >
                            {i}
                        </Button>
                    </>
                );
            })}
        </div>
    );
});
