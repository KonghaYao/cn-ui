import { JSX, JSXElement } from 'solid-js';
import { atom, Atom, atomization } from '../_util/atom';
import { OriginComponent } from '../_util/OriginComponent';

interface LabelProps extends JSX.HTMLAttributes<HTMLLabelElement> {
    children?: JSXElement;
    for?: string;
}
export const DefaultLabel = OriginComponent<LabelProps, HTMLLabelElement>((props) => {
    return (
        <label
            {...props}
            class={props.class('cn-form-label inline-block text-gray-800')}
            style={props.style}
        >
            {props.children}
        </label>
    );
});
interface CheckBoxProps extends JSX.HTMLAttributes<HTMLDivElement> {
    children?: JSXElement;
    value?: boolean | Atom<boolean>;
    checkedChar?: string;
    onValueChange?: (e, value: boolean) => void;
}
import './style/checkbox.css';
export const CheckBox = OriginComponent<CheckBoxProps, HTMLDivElement>((props) => {
    const value = atomization(props.value);
    return (
        <div class={props.class('cn-form-check')} style={props.style}>
            <span
                class="cn-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                /** @ts-ignore */
                attr:checked={value()}
                onClick={(e) => {
                    value((i) => !i);
                    props.onInput && props.onValueChange(e, value());
                }}
                checked-char={props.checkedChar ?? '√'}
            ></span>
            <input class="hidden" type="checkbox" checked={value()} id={props.id}></input>
            <DefaultLabel for={props.id}>{props.children}</DefaultLabel>
        </div>
    );
});
