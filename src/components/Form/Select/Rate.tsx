import {
    Atom,
    atom,
    atomization,
    emitEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Component, For, JSX } from 'solid-js';
import { Icon } from '../../Icon';

interface RateProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<number>;

    allowHalf?: boolean;
}

export const Rate = OriginComponent<RateProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? 0);
    let keepVal = value();
    const control = useEventController({ disabled });
    let colorRef: HTMLInputElement;
    const getRate = (e) => {
        if (props.allowHalf && e.offsetX < 12) {
            return 0.5;
        } else {
            return 1;
        }
    };
    return (
        <>
            <div
                class="w-fit text-slate-200 text-2xl"
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
                            class="cursor-pointer relative"
                            classList={{
                                'text-yellow-400': value() > i,
                            }}
                            onMouseMove={(e) => {
                                value(getRate(e) + i);
                            }}
                            onClick={(e) => {
                                value(getRate(e) + i);
                                keepVal = value();
                            }}
                        >
                            <div
                                class="absolute right-0 top-0 h-full pointer-events-none"
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
        </>
    );
});
