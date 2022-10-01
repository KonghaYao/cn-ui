import tippy, { Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Component, onCleanup } from 'solid-js';
import { atom, Atom } from '../_util/atom';
import { createIgnoreHead } from '../_util/createIgnoreHead';

export type TriggerProps = Omit<Partial<Props>, 'content'> & {
    content: Component;
    disabled?: Atom<boolean>;
    visible?: Atom<boolean>;
};
import 'tippy.js/animations/scale.css';
/** 用于在 ref 上使用的 Trigger 函数 */
export const createTrigger = (props: TriggerProps) => {
    return (el: Element) => {
        const p = Object.assign(
            {
                animation: 'scale',
            },
            props,
            {
                onShow(instance) {
                    visible(true);
                    props.onShow && props.onShow(instance);
                },
                onHide(instance) {
                    visible(false);
                    props.onHide && props.onHide(instance);
                },
            } as TriggerProps
        );
        const instance = tippy(el, p as Props);
        const disabled = props.disabled ?? atom(false);
        const visible = props.visible ?? atom(false);
        console.log(instance);
        createIgnoreHead(() => {
            if (disabled() !== instance.state.isEnabled) {
                instance.state.isEnabled ? instance.hide() : instance.show();
                disabled(instance.state.isEnabled);
            }
        }, [disabled]);
        createIgnoreHead(() => {
            if (visible() !== instance.state.isVisible) {
                instance.state.isVisible ? instance.hide() : instance.show();
                visible(instance.state.isVisible);
            }
        }, [visible]);
        onCleanup(() => {
            instance && instance.destroy();
        });
    };
};
