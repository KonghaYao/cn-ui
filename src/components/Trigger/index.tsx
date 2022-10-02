import { Component, createMemo, onCleanup } from 'solid-js';
import { atom, Atom } from '@cn-ui/use';

export type TriggerProps = Omit<Partial<Props>, 'content'> & {
    content: string | Component;
    /** 控制 Trigger 能否被触发，交由外部控制，返回的值可能不正确 */
    disabled?: Atom<boolean>;
    /** 控制 Trigger 的显示 */
    visible?: Atom<boolean>;
};
import tippy, { Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
const defaultProps = {
    animation: 'scale',
};
/** 用于在 ref 上使用的 Trigger 函数 */
export const createTrigger = (props: TriggerProps) => {
    return (el: Element) => {
        const p = Object.assign(defaultProps, props, {
            onShow(instance) {
                visible(true);
                props.onShow && props.onShow(instance);
            },
            onHide(instance) {
                visible(false);
                props.onHide && props.onHide(instance);
            },
        } as TriggerProps);
        const instance = tippy(el, p as Props);

        const disabled = props.disabled ?? atom(false);
        const visible = props.visible ?? atom(false);

        createMemo(() => {
            disabled() ? instance.disable() : instance.enable();
        }, [disabled]);
        createMemo(() => {
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
