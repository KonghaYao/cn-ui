import { children, Component, JSX, JSXElement, Show } from 'solid-js';
import { Atom, OriginComponent, atomization } from '@cn-ui/use';
import { debounce, throttle } from 'lodash-es';
import { usePositionString } from './usePositionString';

const TailwindOrigin = {
    right: 'origin-right',
    left: 'origin-left',
    bottom: 'origin-bottom',
    top: 'origin-top',
    'bottom left': 'origin-bottom-left',
    'bottom right': 'origin-bottom-right',
    'top left': 'origin-top-left',
    'top right': 'origin-top-right',
};
export interface FloatPanelProps {
    position?: 'l' | 'r' | 't' | 'b' | 'tl' | 'lt' | 'lb' | 'bl' | 'br' | 'rb' | 'rt' | 'tr';
    visible?: boolean | Atom<boolean>;
    disabled?: boolean | Atom<boolean>;

    /** 样式更改的 debounce  */
    debounce?: number | false;
    class?: string;
    popupClass?: string;
    children: JSXElement;
    popup:
        | JSXElement
        | Component<{
              show: Atom<boolean>;
              transformOrigin: JSX.CSSProperties['transform-origin'];
              TailwindOriginClass: string;
          }>;
}
/** 鼠标浮动上去显示的结构 */
export const FloatPanel = OriginComponent<FloatPanelProps>((props) => {
    const el = children(() => props.children)() as HTMLElement;
    const show = atomization(props.visible ?? false);
    const disabled = atomization(props.disabled ?? false);

    /** 改变面板状态 */
    const change = (target: boolean) => {
        if (disabled()) return;
        show(target);
    };
    const changeShow = props.debounce === false ? change : debounce(change, props.debounce ?? 150);
    const lockShowType = () => changeShow(true);
    el.addEventListener('mouseover', lockShowType);
    const pos = usePositionString(props.position ?? 'bl');
    return (
        <div
            class={props.class('relative')}
            onmouseleave={() => changeShow(false)}
            onmouseout={() => changeShow(false)}
        >
            {el}

            <section
                class={
                    'pointer-events-auto absolute z-40  overflow-visible rounded-md transition-all ' +
                    (props.popupClass ?? '')
                }
                ref={props.ref}
                style={{ ...props.style, ...pos }}
                onmouseover={lockShowType}
                // 这两个事件绑定是为了用户在输入的时候不会关闭
                onfocusin={() => disabled(true)}
                onfocusout={() => disabled(false)}
            >
                {props.popup instanceof Function
                    ? props.popup({
                          show,
                          transformOrigin: pos['transform-origin'],
                          TailwindOriginClass: TailwindOrigin[pos['transform-origin']],
                      })
                    : props.popup}
            </section>
        </div>
    );
});
