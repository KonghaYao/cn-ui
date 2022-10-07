import { Atom, atom, atomization, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, mergeProps, Suspense } from 'solid-js';
import { useEventController } from '@cn-ui/use';
import './Slider.css';
export interface SliderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: number | Atom<number>;
    placeholder?: string;
    allowClear?: boolean;
    left?: JSXElement;
    right?: JSXElement;
    button?: boolean;
    min?: number;
    max?: number;
    step?: number;
}

export const Slider = OriginComponent<SliderProps>((props) => {
    // 不同于 InputNumber，这个是不一样的
    props = mergeProps({ min: 0, max: 100, step: 1 }, props);
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? 0);

    const control = useEventController({ disabled });
    return (
        <div
            class={props.class('cn-slider w-full flex items-center ')}
            classList={{
                'cursor-not-allowed': disabled(),
            }}
            style={props.style}
            ref={props.ref}
        >
            <input
                disabled={disabled()}
                placeholder={props.placeholder || '请输入'}
                class="flex-1  outline-none  appearance-none "
                min={props.min}
                max={props.max}
                step={props.step}
                type={'range'}
                value={value()}
                oninput={control((e) => {
                    let newValue = (e.target as any).value;
                    value(newValue);
                })}
            ></input>
        </div>
    );
});
