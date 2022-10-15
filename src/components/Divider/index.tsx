import { OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement } from 'solid-js';
interface DividerProps extends JSX.HTMLAttributes<HTMLHRElement> {
    vertical?: boolean;
    children?: JSXElement;
}
import './style/index.css';
export const Divider = OriginComponent<DividerProps>((props) => {
    return (
        <div
            /** @ts-ignore */
            vertical={props.vertical}
            class={props.class(
                'cn-divider flex items-center',
                props.vertical ? 'h-full flex-col' : 'w-full flex-row'
            )}
            style={props.style}
            ref={props.ref}
        >
            {props.children}
        </div>
    );
});

/**
 * @zh 借鉴 Tailwind 的分割线
 * @link https://tailwindui.com/components?ref=sidebar
 */
export const StyleDivider = (props) => {
    const back = {
        'background-image': `linear-gradient(${
            props.vertical ? '0' : '90deg'
        },rgba(56,189,248,0) 0%,#0EA5E9 32.29%,rgba(236,72,153,0.3) 67.19%,rgba(236,72,153,0) 100%)`,
    };
    return (
        <div
            class={
                props.vertical
                    ? '-ml-px flex h-full w-[2px] -scale-y-100'
                    : '-mb-px flex h-[2px] w-full -scale-x-100'
            }
        >
            <div
                class={
                    props.vertical
                        ? 'h-full w-full flex-none blur-sm '
                        : 'w-full flex-none blur-sm '
                }
                style={back}
            ></div>
            <div
                class={
                    props.vertical
                        ? '-mt-[100%] h-full w-full flex-none blur-[1px] '
                        : '-ml-[100%] w-full flex-none blur-[1px] '
                }
                style={back}
            ></div>
        </div>
    );
};