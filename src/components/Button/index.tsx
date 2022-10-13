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
    const classNames = createMemo(() =>
        props.class(
            'cn-btn',

            reflect(() => SizeTrans[props.size])(),
            reflect(() => getColorSet()[props.color])(),
            props.text && 'hover:bg-slate-100/50 border-none',
            loading() && 'pointer-events-none',
            props.block && 'w-full',
            props.disabled && 'opacity-90 cursor-not-allowed',
            radius(),
            'inline-flex items-center border border-gray-300 whitespace-nowrap px-4 py-2 text-sm  shadow-sm focus:outline-none  select-none hover:brightness-110 active:brightness-90 justify-center'
        )
    );

    const control = useEventController({});
    return (
        <button
            ref={props.ref}
            class={classNames()}
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
