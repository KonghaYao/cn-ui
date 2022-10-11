import { batch, JSX, JSXElement } from 'solid-js';
import { Atom, atomization, extendsEvent } from '@cn-ui/use';
import { OriginComponent } from '@cn-ui/use';

interface LabelProps extends JSX.HTMLAttributes<HTMLLabelElement> {
    children?: JSXElement;
    for?: string;
}
export const DefaultLabel = OriginComponent<LabelProps, HTMLLabelElement>((props) => {
    return (
        <label
            {...props}
            class={props.class('cn-form-label inline-block text-slate-800')}
            style={props.style}
        >
            {props.children}
        </label>
    );
});
export interface CheckBoxProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onValueInput'> {
    children?: JSXElement;
    extra?: JSXElement;
    value: boolean | Atom<boolean>;
    disabled?: boolean | Atom<boolean>;
    indeterminate?: boolean | Atom<boolean>;

    checkedChar?: string;

    onValueInput?: (e, value: boolean) => void | Promise<boolean>;
}
import './style/checkbox.css';
import { emitEvent, useEventController } from '@cn-ui/use';
export const CheckBox = OriginComponent<CheckBoxProps, HTMLDivElement>((props) => {
    const value = atomization(props.value);
    const disabled = atomization(props.disabled);
    const indeterminate = atomization(props.indeterminate);
    const control = useEventController({ disabled });
    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-form-check select-none cursor-pointer flex-none',
                disabled() && 'pointer-events-none opacity-70 cursor-not-allowed'
            )}
            style={props.style}
            {...extendsEvent(props)}
            onClick={control(
                [
                    emitEvent(props.onValueInput, ([e]) => [e, !value()] as const),
                    async (e) => {
                        value((i) => !i);
                    },
                ],
                { batch: true }
            )}
        >
            <span
                class="cn-check appearance-none h-4 w-4 border border-slate-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 "
                classList={{
                    indeterminate: indeterminate(),
                }}
                /** @ts-ignore */
                attr:checked={value()}
                checked-char={props.checkedChar ?? '√'}
            ></span>
            <input
                class="hidden"
                type="checkbox"
                checked={value()}
                id={props.id}
                disabled={disabled()}
            ></input>
            <DefaultLabel for={props.id}>{props.children}</DefaultLabel>
            {props.extra}
        </div>
    );
});
