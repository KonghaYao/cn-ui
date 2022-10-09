import { JSX, JSXElement } from 'solid-js';
import { OriginComponent } from '@cn-ui/use';
import { Space } from '../Space';
import { Atom } from 'solid-use';

export interface BreadcrumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
    separator?: JSXElement;
    list: Atom<string[]>;
    onTrigger?: (index: number) => void;
}

export const Breadcrumb = OriginComponent<BreadcrumbProps>((props) => {
    return (
        <div
            class={props.class(
                'flex px-4 py-1 cursor-pointer bg-slate-100 rounded-lg text-gray-600'
            )}
            style={props.style}
            ref={props.ref}
        >
            {props.separator ?? '>'}
            {props.list().map((i, index) => {
                return (
                    <>
                        {index === 0 ? null : props.separator ?? '>'}
                        <span class=" px-2" onclick={() => props.onTrigger(index)}>
                            {i}
                        </span>
                    </>
                );
            })}
        </div>
    );
});
