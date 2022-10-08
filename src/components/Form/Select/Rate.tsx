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
    return (
        <>
            <div
                class="w-fit text-gray-100 text-2xl"
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
                            classList={{
                                'text-orange-400': value() > i,
                            }}
                            onMouseMove={(e) => {
                                if (props.allowHalf && e.offsetX < 12) {
                                    value(i + 0.5);
                                } else {
                                    value(i + 1);
                                }
                            }}
                            onClick={(e) => {
                                if (props.allowHalf && e.offsetX < 12) {
                                    value(i + 0.5);
                                } else {
                                    value(i + 1);
                                }
                                keepVal = value();
                            }}
                        ></Icon>
                    );
                })}{' '}
                {value()}
            </div>
        </>
    );
});
