import { OriginComponent } from '../_util/OriginComponent';
import tippy, { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import {
    children,
    Component,
    createEffect,
    createReaction,
    JSXElement,
    onCleanup,
    onMount,
} from 'solid-js';
import { atom, Atom } from '../_util/atom';
import { createIgnoreHead } from '../_util/createIgnoreHead';

export type TriggerProps = Omit<Partial<Props>, 'content'> & {
    content: Component;
    disabled?: Atom<boolean>;
    visible?: Atom<boolean>;
};

/** 用于在 ref 上使用的 Trigger 函数 */
export const createTrigger = (props: TriggerProps) => {
    return (el: Element) => {
        const instance = tippy(el, props as Props);
        const disabled = props.disabled ?? atom(false);
        const visible = props.visible ?? atom(false);
        createIgnoreHead(() => {
            disabled() ? instance.disable() : instance.enable();
        }, [disabled]);
        createIgnoreHead(() => {
            visible() ? instance.hide() : instance.show();
        }, [visible]);
        console.log(instance);

        onCleanup(() => {
            instance && instance.destroy();
        });
    };
};

export const Trigger = (el, props) => {
    console.log(el);
    console.log('渲染2');

    createEffect(() => {
        const instance = tippy(el, props);
        console.log(el);
        onCleanup(() => {
            instance &&
                instance.forEach((i) => {
                    i.destroy();
                });
        });
    });
    return props.children;
};
