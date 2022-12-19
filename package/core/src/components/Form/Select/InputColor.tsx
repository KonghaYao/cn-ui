import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Component, For, JSX } from 'solid-js';

export interface InputColorProps extends JSX.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<string>;
}

export const InputColor = OriginComponent<InputColorProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? '');
    const control = useEventController({ disabled });
    let colorRef: HTMLInputElement;
    return (
        <div
            class={props.class(
                'leading-0 inline-block h-6 w-6 rounded-full border-2 border-solid border-slate-400'
            )}
            style={{
                'background-color': value(),
                ...props.style,
            }}
            {...extendsEvent(props)}
            onClick={control([
                emitEvent(props.onClick),
                () => {
                    colorRef.showPicker();
                },
            ])}
            ref={props.ref}
        >
            <input
                class="w-0 opacity-0"
                ref={colorRef}
                type="color"
                value={value()}
                oninput={control([
                    emitEvent(props.onInput),
                    (e) => {
                        value(e.target.value);
                    },
                ])}
            ></input>
        </div>
    );
});
