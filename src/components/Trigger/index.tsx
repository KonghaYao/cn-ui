import { children, createMemo, JSXElement, mergeProps, onCleanup, onMount } from 'solid-js';
import { atom, Atom, atomization, OriginComponent } from '@cn-ui/use';

export type TriggerProps = Omit<Partial<Props>, 'content'> & {
    content: JSXElement;
    /** 控制 Trigger 能否被触发，交由外部控制，返回的值可能不正确 */
    disabled?: Atom<boolean>;
    /** 控制 Trigger 的显示 */
    visible?: Atom<boolean>;
    children?: JSXElement;
};
import tippy, { Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
const defaultProps = {
    animation: 'scale',
};
/**
 * @zh Popup 层控制组件
 * @link https://atomiks.github.io/tippyjs/v6/tippy-instance/
 */
export const Trigger = OriginComponent<TriggerProps>((props) => {
    const child = children(() => props.children);
    const disabled = atomization(props.disabled ?? false);
    const visible = atomization(props.visible ?? false);

    const p = mergeProps(defaultProps, props, {
        onShow(instance) {
            visible(true);
            props.onShow && props.onShow(instance);
        },
        onHide(instance) {
            visible(false);
            props.onHide && props.onHide(instance);
        },
    } as TriggerProps);
    onMount(() => {
        const instance = tippy(child.toArray()[0] as Element, p as Props);

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
    });
    return child();
});
