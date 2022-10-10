import { Atom, atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, mergeProps, Suspense } from 'solid-js';

import { Icon } from '../../Icon';
import { Space } from '../../Space';
import { defaultSlot } from '../../_util/defaultSlot';
import { useEventController } from '@cn-ui/use';
import { useStep } from './useStep';
export interface InputNumberProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

export const InputNumber = OriginComponent<InputNumberProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? 0);
    let inputRef: HTMLInputElement;
    const control = useEventController({ disabled });
    // * fixed 这里有精度问题！所以采用原生的加减以解决
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
    // const { add, sub } = useStep(value, props);
    return (
        <div
            class={props.class(
                'w-full flex items-center  bg-slate-100 px-4 py-1 hover:border-blue-400 border-solid border-transparent border-2 rounded transition-colors duration-300 text-slate-500'
            )}
            style={props.style}
            ref={props.ref}
            classList={{
                'cursor-not-allowed': disabled(),
            }}
            {...extendsEvent(props)}
        >
            <div
                class="sub flex items-center"
                onClick={control(() => {
                    inputRef.stepDown();
                })}
            >
                {props.button &&
                    defaultSlot(
                        <Icon
                            name="subject"
                            class="px-2 hover:bg-slate-200 transition-colors"
                        ></Icon>,
                        props.left
                    )}
            </div>

            <input
                ref={inputRef}
                disabled={disabled()}
                placeholder={props.placeholder || '请输入'}
                class="flex-1 appearance-none outline-none bg-slate-100 "
                min={props.min}
                max={props.max}
                step={props.step}
                type={'number'}
                value={value()}
                inputmode="decimal"
                oninput={control((e) => {
                    let newValue = (e.target as any).value;
                    value(newValue);
                })}
            ></input>
            <div
                class="add flex items-center"
                onClick={control(() => {
                    inputRef.stepUp();
                })}
            >
                {props.button &&
                    defaultSlot(
                        <Icon name="add" class="px-2 hover:bg-slate-200 transition-colors"></Icon>,
                        props.right
                    )}
            </div>
        </div>
    );
});
