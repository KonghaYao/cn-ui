import { ButtonProps } from './interface';
import { Icon } from '@cn-ui/core';
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
    size: 'mini',
};
import { Color, TextColor, SizeTrans } from '../_util/design';
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);
    const loading = atomization(props.loading);

    const getColorSet = () => {
        if (props.text) return [Color.white.replace('text-black', ''), TextColor[props.color]];
        return Color[props.color];
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
                SizeTrans[props.size],
                getColorSet(),
                props.text && 'border-none',
                loading() && 'pointer-events-none',
                props.block && 'w-full',
                props.disabled && 'cursor-not-allowed opacity-80',
                radius(),
                'box-border inline-flex select-none items-center justify-center whitespace-nowrap bg-gradient-to-b px-4 py-2 text-sm shadow-suit transition-all duration-300 focus:outline-none  active:scale-95'
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
