import { ButtonProps } from './interface';
import { Icon } from '../Icon';
import { createMemo, mergeProps, Show } from 'solid-js';
import './style/index.css';
import {
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    reflect,
    useEventController,
} from '@cn-ui/use';
const defaultProps: ButtonProps = {
    color: 'blue',
    size: 'normal',
};
import { Color, TextColor, SizeTrans } from './design';
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);
    const loading = atomization(props.loading);

    const getColorSet = () => {
        if (props.text) return TextColor;
        return Color;
    };
    const radius = reflect(() => {
        if (props.round) return 'rounded-2xl';
        if (props.square) return 'rounded-none';
        return 'rounded';
    });

    const control = useEventController({});
    return (
        <button
            ref={props.ref}
            class={props.class(
                'cn-btn',
                reflect(() => SizeTrans[props.size])(),
                reflect(() => getColorSet()[props.color])(),
                props.text && 'border-none hover:bg-slate-100/50',
                loading() && 'pointer-events-none',
                props.block && 'w-full',
                props.disabled && 'cursor-not-allowed opacity-70',
                radius(),
                'inline-flex select-none items-center justify-center whitespace-nowrap border border-gray-300 px-4 py-2 text-sm ',
                ' transition-all duration-300 focus:outline-none focus:brightness-95 active:scale-95'
            )}
            style={{
                ...props.style,
                'border-radius': props.round ? '4em' : props.square ? '0' : '0.6em',
            }}
            type={props.type}
            {...extendsEvent(props, ['onClick'])}
            onClick={control([() => loading(true), emitEvent(props.onClick), () => loading(false)])}
        >
            <Show when={loading()}>{props.icon ? props.icon : <Icon name="refresh" spin />}</Show>
            <span>{props.children}</span>
        </button>
    );
});
