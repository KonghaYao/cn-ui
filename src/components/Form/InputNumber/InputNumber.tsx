import { Atom, atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, mergeProps, Suspense } from 'solid-js';

import { Icon } from '@cn-ui/core';
import { defaultSlot } from '../../_util/defaultSlot';
import { useEventController } from '@cn-ui/use';
import { FormField } from '../interface';
import './InputNumber.css';
import { Gradient } from '../../_util/design';
export interface InputNumberProps extends FormField {
    value: number | Atom<number>;
    placeholder?: string;
    allowClear?: boolean;
    left?: JSXElement;
    right?: JSXElement;
    button?: boolean;
    min?: number;
    max?: number;
    disabled_input?: boolean;
    step?: number;
}

export const InputNumber = OriginComponent<InputNumberProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? 0);
    let inputRef: HTMLInputElement;
    const control = useEventController({ disabled });
    // * fixed 这里有精度问题！所以采用原生的加减以解决
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp

    return (
        <div
            class={props.class(
                'flex w-full items-center rounded-xl border-2 border-solid border-transparent  px-4 py-1  text-blue-600 shadow-suit transition-colors duration-300',
                Gradient.position,
                Gradient.white
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

                    // value(parseInt(inputRef.value));
                })}
            >
                {props.button &&
                    defaultSlot(
                        <Icon
                            name="horizontal_rule"
                            class="h-full px-2 transition-colors hover:bg-slate-200"
                        ></Icon>,
                        props.left
                    )}
            </div>

            <input
                ref={inputRef}
                disabled={disabled()}
                placeholder={props.placeholder || '请输入'}
                class="hidden_control flex-1 appearance-none bg-slate-100 text-center text-slate-700 outline-none"
                classList={{
                    'pointer-events-none': props.disabled_input,
                }}
                min={props.min}
                max={props.max}
                step={props.step}
                type={'number'}
                value={value()}
                inputmode="decimal"
                oninput={control((e) => {
                    let newValue = parseInt((e.target as any).value);
                    if (newValue >= props.min && newValue <= props.max) {
                        value(newValue);
                    } else {
                        value(props.max);
                    }
                })}
            ></input>
            <div
                class="add flex items-center"
                onClick={control(() => {
                    inputRef.stepUp();
                    value(parseInt(inputRef.value));
                })}
            >
                {props.button &&
                    defaultSlot(
                        <Icon name="add" class="px-2 transition-colors hover:bg-slate-200"></Icon>,
                        props.right
                    )}
            </div>
        </div>
    );
});
