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
    htmlType: 'button',
    color: 'blue',
};
import { Color, OutlineColor, SizeTrans } from './design';
export const Button = OriginComponent<ButtonProps, HTMLButtonElement>((baseProps) => {
    const props = mergeProps(defaultProps, baseProps);
    const loading = atomization(props.loading);

    const getColorSet = () => {
        if (props.outline) return OutlineColor;
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
            props.outline ? 'border border-solid hover:bg-slate-50/50' : 'border-transparent',
            reflect(() => SizeTrans[props.size])(),
            reflect(() => getColorSet()[props.color])(),

            loading() && 'pointer-events-none',
            props.block && 'w-full',
            props.disabled && 'opacity-80 cursor-not-allowed',
            radius(),
            'inline-flex items-center justify-center relative outline-none select-none  cursor-pointer whitespace-nowrap box-border  px-4'
        )
    );

    const control = useEventController({});
    return (
        <button
            ref={props.ref}
            class={classNames()}
            style={props.style}
            type={props.htmlType}
            {...extendsEvent(props, ['onClick'])}
            onClick={control([() => loading(true), emitEvent(props.onClick), () => loading(false)])}
        >
            <Show when={loading()}>{props.icon ? props.icon : <Icon name="refresh" spin />}</Show>
            <span>{props.children}</span>
        </button>
    );
});
