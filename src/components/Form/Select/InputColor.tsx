import {
    Atom,
    atom,
    atomization,
    emitEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Component, For, JSX } from 'solid-js';

interface InputColorProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<string>;
}

export const InputColor = OriginComponent<InputColorProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? '');
    const control = useEventController({ disabled });
    let colorRef: HTMLInputElement;
    return (
        <>
            <div
                class="h-6 w-6 inline-block leading-0 border-2 border-solid border-slate-400 rounded-full"
                style={{
                    'background-color': value(),
                }}
                onclick={() => {
                    colorRef.showPicker();
                }}
            >
                <input
                    class="w-0 opacity-0"
                    ref={colorRef}
                    type="color"
                    value={value()}
                    oninput={control((e) => {
                        value(e.target.value);
                    })}
                ></input>
            </div>
        </>
    );
});
