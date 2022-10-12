import { atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import {
    createEffect,
    createSignal,
    onCleanup,
    onMount,
    JSX,
    JSXElement,
    mergeProps,
} from 'solid-js';
import { splitProps } from 'solid-js';
import OriginSplit from 'split.js';
import './style.css';

export interface SplitProps extends OriginSplit.Options {
    // mode?: 'flex';
    children: JSXElement;
}

export const Split = OriginComponent<SplitProps>((props) => {
    // const children = solidChildren(() => params.children);
    props = mergeProps(
        {
            elementStyle(dimension, size, gutterSize) {
                return {
                    'flex-basis': 'calc(' + size + '%)',
                };
            },
            gutterStyle(dimension, gutterSize) {
                return {
                    'flex-basis': gutterSize + 'px',
                };
            },
        },
        props
    );
    const ref = atom<HTMLDivElement | null>(null);

    createEffect(() => {
        const children = ref() && ref()!.children;
        if (children.length) {
            let split = OriginSplit(children as any as HTMLElement[], props);
            onCleanup(() => split.destroy());
        }
    });
    createEffect(() => {
        ref() && props.direction === 'horizontal'
            ? Array.from(ref()!.getElementsByClassName('gutter')).forEach((gutter) => {
                  if (gutter.classList.contains('gutter-enchanced-y'))
                      gutter.classList.remove('gutter-enchanced-y');
                  gutter.classList.add('gutter-enchanced-x');
              })
            : Array.from(ref()!.getElementsByClassName('gutter')).forEach((gutter) => {
                  if (gutter.classList.contains('gutter-enchanced-x'))
                      gutter.classList.remove('gutter-enchanced-x');
                  gutter.classList.add('gutter-enchanced-y');
              });
    });
    return (
        <div
            role="presentation"
            ref={(container: HTMLDivElement) => {
                ref(container);
            }}
            class={props.class('flex', {
                'flex-row': props.direction === 'horizontal',
                'flex-col': props.direction === 'vertical',
            })}
            style={props.style}
            {...extendsEvent(props)}
        >
            {props.children}
        </div>
    );
});
