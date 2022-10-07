import { Atom, atom, atomization, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, Suspense } from 'solid-js';

import { Icon } from '../../Icon';
import { Space } from '../../Space';
interface TextProps extends JSX.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<string>;
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
export const InputText = OriginComponent<TextProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? '');

    return (
        <div class="w-full flex items-center bg-gray-100 px-4 py-1 hover:border-blue-400 border-solid border-transparent border-2 rounded transition-colors duration-300 text-gray-500">
            {props.icon !== undefined ? props.icon : <Icon name="border_color" class="pr-4"></Icon>}
            <input
                disabled={disabled()}
                placeholder={props.placeholder || '请输入'}
                class="flex-1 outline-none bg-gray-100 "
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
