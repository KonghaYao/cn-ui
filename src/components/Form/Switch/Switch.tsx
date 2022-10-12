import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use/src/index';
import { JSX } from 'solid-js';

interface SwitchProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<boolean>;
}
export const Switch = OriginComponent<SwitchProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? false);
    const control = useEventController({ disabled });
    const loading = atom(false);
    return (
        <button
            class={props.class(
                'rounded-2xl w-12 h-6 shadow-inner bg-slate-200 transition-all duration-300 ease-in-out'
            )}
            classList={{
                'bg-blue-500': value(),
                'opacity-70': disabled() || loading(),
            }}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props, ['onClick'])}
            onClick={control(
                [
                    emitEvent(props.onClick),
                    () => {
                        value((i) => !i);
                    },
                ],
                { loading }
            )}
        >
            <div
                class="h-4 w-4  bg-white rounded-full ml-1 transition-all duration-300 ease-in-out"
                classList={{
                    'ml-7': value(),
                }}
            ></div>
        </button>
    );
});
