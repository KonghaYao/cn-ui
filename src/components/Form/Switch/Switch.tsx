import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { FormField } from '../interface';

export interface SwitchProps extends FormField {
    value: Atom<boolean>;
}
export const Switch = OriginComponent<SwitchProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? false);
    const control = useEventController({ disabled });
    const loading = atom(false);
    return (
        <button
            class={props.class(
                'h-6 w-12 rounded-2xl bg-slate-200 shadow-inner transition-all duration-300 ease-in-out'
            )}
            classList={{
                'bg-blue-500': value(),
                'opacity-70': disabled() || loading(),
            }}
            style={props.style}
            /** @ts-ignore */
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
                class="ml-1 h-4  w-4 rounded-full bg-white transition-all duration-300 ease-in-out"
                classList={{
                    'ml-7': value(),
                }}
            ></div>
        </button>
    );
});
