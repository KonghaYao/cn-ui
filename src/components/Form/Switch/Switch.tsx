import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Color } from '../../_util/design';
import { FormField } from '../interface';

export interface SwitchProps extends FormField {
    value: Atom<boolean>;
    color?: keyof typeof Color;
}
export const Switch = OriginComponent<SwitchProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? false);
    const control = useEventController({ disabled });
    const loading = atom(false);
    return (
        <button
            class={props.class(
                'h-6 w-12 rounded-2xl bg-gradient-to-b  shadow-suit transition-all duration-300 ease-in-out'
            )}
            classList={{
                [Color.white]: !value(),
                [Color[props.color ?? 'blue']]: value(),
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
                class="ml-1 h-4 w-4 rounded-full bg-gradient-to-b shadow-suit transition-all duration-300 ease-in-out"
                classList={{
                    'ml-7': value(),
                    [Color['white']]: value(),
                    [Color[props.color ?? 'blue']]: !value(),
                }}
            ></div>
        </button>
    );
});
