import {
    Atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Icon } from '@cn-ui/core';
import { FormField } from '../interface';

export interface RateProps extends FormField {
    value: Atom<number>;
    allowHalf?: boolean;
    onValueInput?: (e, value: number) => void | Promise<boolean>;
}

export const Rate = OriginComponent<RateProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? 0);
    let keepVal = value();
    const control = useEventController({ disabled });

    const getRate = (e) => {
        if (props.allowHalf && e.offsetX < 12) {
            return 0.5;
        } else {
            return 1;
        }
    };
    return (
        <div
            class={props.class('flex w-fit gap-2 text-2xl text-slate-200')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
            onmouseenter={() => {
                keepVal = value();
            }}
            onmouseleave={() => {
                value(keepVal);
            }}
        >
            {[...Array(5).keys()].map((i) => {
                return (
                    <Icon
                        name="star"
                        class="relative cursor-pointer"
                        classList={{
                            'text-yellow-400': value() > i,
                        }}
                        onMouseMove={(e) => {
                            value(getRate(e) + i);
                        }}
                        onClick={control([
                            emitEvent(props.onValueInput),
                            (e) => {
                                value(getRate(e) + i);
                                keepVal = value();
                            },
                        ])}
                    >
                        <div
                            class="pointer-events-none absolute right-0 top-0 h-full"
                            classList={{
                                'backdrop-grayscale': value() === i + 0.5,
                            }}
                            style="width:50%"
                        >
                            half
                        </div>
                    </Icon>
                );
            })}
            {value()}
        </div>
    );
});
