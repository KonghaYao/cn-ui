import { Atom, atom, atomization, extendsEvent, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, Suspense } from 'solid-js';

import { Icon } from '@cn-ui/core';
import { FormField } from '../interface';
export interface InputTextProps extends FormField {
    value: Atom<string>;
    placeholder?: string;
    allowClear?: boolean;
    /**
     * @zh 输入框最大输入的长度
     */
    maxLength?: number | { length: number; errorOnly?: boolean };
    /**
     * @zh 配合 `maxLength`，显示字数统计
     */
    showWordLimit?: boolean;
    icon?: JSXElement;
}
export const InputText = OriginComponent<InputTextProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? '');

    return (
        <div
            class={props.class(
                'flex w-full items-center rounded border-2 border-solid border-transparent bg-slate-100 px-4 py-1 text-slate-500 transition-colors duration-300 hover:border-blue-400'
            )}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            {props.icon !== undefined ? props.icon : <Icon name="border_color" class="pr-4"></Icon>}
            <input
                disabled={disabled()}
                placeholder={props.placeholder || '请输入'}
                class="flex-1 bg-slate-100 outline-none "
                classList={{
                    'cursor-not-allowed': disabled(),
                }}
                type={'text'}
                value={value()}
                oninput={(e) => {
                    let newValue = (e.target as any).value;
                    if (typeof props.maxLength === 'number' && newValue.length > props.maxLength) {
                        newValue = newValue.slice(0, props.maxLength);
                        (e.target as any).value = newValue;
                    }
                    value(newValue);
                }}
            ></input>
            {props.allowClear && (
                <Icon
                    name="clear"
                    onClick={() => {
                        value('');
                        console.log('触发点击事件');
                    }}
                ></Icon>
            )}
            {props.showWordLimit && (
                <div class="text-xs italic ">
                    {typeof props.maxLength === 'number'
                        ? value().length + '/' + props.maxLength
                        : value().length}
                </div>
            )}
            {props.children}
        </div>
    );
});
