import { children, Component, JSX, JSXElement, Show } from 'solid-js';
import { Atom, OriginComponent, atomization } from '@cn-ui/use';

const usePositionString = (
    s: 'l' | 'r' | 't' | 'b' | 'tl' | 'lt' | 'lb' | 'bl' | 'br' | 'rb' | 'rt' | 'tr'
): JSX.CSSProperties => {
    switch (s) {
        case 'l':
            return {
                top: '50%',
                left: 0,
                'transform-origin': 'center right',
                translate: '-100% -50%',
            };
        case 'r':
            return {
                top: '50%',
                right: 0,
                'transform-origin': 'center left',
                translate: '100% -50%',
            };
        case 't':
            return {
                top: 0,
                left: '50%',
                'transform-origin': 'bottom center',
                translate: '-50% -100%',
            };
        case 'b':
            return {
                left: '50%',
                bottom: 0,
                'transform-origin': 'top center',
                translate: '-50% 100%',
            };
        case 'tl':
            return {
                top: 0,
                left: 0,
                'transform-origin': 'bottom left',
                translate: '0% -100%',
            };
        case 'tr':
            return {
                top: 0,
                right: 0,
                'transform-origin': 'bottom right',
                translate: '0% -100%',
            };
        case 'rt':
            return {
                right: 0,
                top: 0,
                'transform-origin': 'top left',
                translate: '100% 0',
            };
        case 'lt':
            return {
                left: 0,
                top: 0,
                'transform-origin': 'top right',
                translate: '-100% 0',
            };
        case 'lb':
            return {
                left: 0,
                bottom: 0,
                'transform-origin': 'bottom right',
                translate: '-100% 0',
            };
        case 'rb':
            return {
                right: 0,
                bottom: 0,
                'transform-origin': 'bottom left',
                translate: '100% 0',
            };
        case 'bl':
            return {
                left: 0,
                bottom: 0,
                'transform-origin': 'top left',
                translate: '0% 100%',
            };
        case 'br':
            return {
                right: 0,
                bottom: 0,
                'transform-origin': 'top right',
                translate: '0 100%',
            };
    }
};

/** 鼠标浮动上去显示的结构 */
export const FloatPanel = OriginComponent<{
    position?: 'l' | 'r' | 't' | 'b' | 'tl' | 'lt' | 'lb' | 'bl' | 'br' | 'rb' | 'rt' | 'tr';
    visible?: boolean | Atom<boolean>;
    disabled?: boolean | Atom<boolean>;
    class?: string;
    popupClass?: string;
    children: JSXElement;
    popup: JSXElement | Component;
}>((props) => {
    const el = children(() => props.children)() as HTMLElement;
    const show = atomization(props.visible ?? false);
    const disabled = atomization(props.disabled ?? false);

    const changeShow = (target: boolean) => {
        if (disabled()) return;
        show(target);
    };
    const mouseover = () => changeShow(true);
    el.addEventListener('mouseover', mouseover);
    const pos = usePositionString(props.position ?? 'bl');
    console.log(pos);
    return (
        <div
            class={props.class('relative')}
            onMouseLeave={() => changeShow(false)}
            onmouseout={() => changeShow(false)}
        >
            {el}
            <section
                class={
                    'absolute z-40 overflow-scroll  rounded-md transition-all duration-300 ' +
                    (props.popupClass ?? '')
                }
                classList={{
                    'scale-0 opacity-0 pointer-events-none': !show(),
                    'scale-100 opacity-100 pointer-event-auto': show(),
                }}
                ref={props.ref}
                style={{ ...props.style, ...pos }}
                onmouseover={mouseover}
            >
                {props.popup instanceof Function ? props.popup({}) : props.popup}
            </section>
        </div>
    );
});
