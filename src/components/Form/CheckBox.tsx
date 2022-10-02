import { For, JSX, JSXElement } from 'solid-js';
import { atom, Atom, atomization, reflect } from '../_util/atom';
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
interface CheckBoxProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onValueInput'> {
    children?: JSXElement;
    extra?: JSXElement;
    value: boolean | Atom<boolean>;
    disabled?: boolean | Atom<boolean>;
    indeterminate?: boolean | Atom<boolean>;

    checkedChar?: string;

    onValueInput?: (e, value: boolean) => void | Promise<boolean>;
}
import './style/checkbox.css';
import { useSingleAsync } from '../_util/useSingleAsync';
import { Space } from '../Space';
import { SpaceProps } from '../Space/interface';
export const CheckBox = OriginComponent<CheckBoxProps, HTMLDivElement>((props) => {
    const value = atomization(props.value);
    const disabled = atomization(props.disabled);
    const indeterminate = atomization(props.indeterminate);
    const { newChannel: ClickChannel } = useSingleAsync();
    return (
        <div
            ref={props.ref}
            class={props.class(
                'cn-form-check select-none cursor-pointer',
                disabled() && 'pointer-events-none opacity-70 cursor-not-allowed'
            )}
            style={props.style}
            onClick={(e) => {
                ClickChannel(async (e) => {
                    const old = value();
                    const keep = props.onValueInput && (await props.onValueInput(e, !old));
                    if (keep === false) return;
                    value(!old);
                }, e);
            }}
        >
            <span
                class="cn-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white  focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 "
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

export type CheckGroupData = Omit<CheckBoxProps, 'value'> & { value: Atom<boolean> };
interface CheckGroupProps extends SpaceProps {
    data: CheckGroupData[];
}

export const CheckGroup = OriginComponent<CheckGroupProps, HTMLDivElement>((props) => {
    return (
        <Space {...props}>
            <For each={props.data}>
                {(it) => {
                    return <CheckBox {...it}></CheckBox>;
                }}
            </For>
        </Space>
    );
});

interface CheckGroupProps extends Omit<CheckBoxProps, 'onValueInput' | 'value' | 'indeterminate'> {
    data: CheckGroupData[];
    children?: JSXElement;
}
/** 数据驱动的 生成组件 */
export const CheckGroupController = OriginComponent<CheckGroupProps, HTMLDivElement>((props) => {
    const checkedListState = reflect(() => props.data.some((i) => i.value()));
    const indeterminate = reflect(() => !props.data.every((i) => i.value()));
    return (
        <CheckBox
            {...props}
            value={checkedListState}
            indeterminate={indeterminate}
            onValueInput={async (e, value) => {
                if (indeterminate()) {
                    props.data.forEach((i) => i.value(true));
                    return false;
                }
                props.data.forEach((i) => i.value(value));
                return false;
            }}
        >
            {props.children}
        </CheckBox>
    );
});
