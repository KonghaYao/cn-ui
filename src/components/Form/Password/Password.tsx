import { Atom, atom, atomization, OriginComponent } from '@cn-ui/use';
import { createContext, JSX, JSXElement, lazy, Suspense } from 'solid-js';

import { Icon, Space } from '@cn-ui/core';
import { FormField } from '../interface';
import { Gradient } from '../../_util/design';
export interface PasswordScoreProps {
    userInputs?: string[];
}
export interface PasswordProps extends PasswordScoreProps, FormField {
    value: Atom<string>;
    /** @zh 是否加载评分等级系统 */
    score?: JSXElement;
    icon?: JSXElement;
    visibleIcon?: boolean;
    placeholder?: string;
}
export const PasswordContext = createContext<{
    value: Atom<string>;
}>();
export const Password = OriginComponent<PasswordProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const canShow = atom(false);
    const value = atomization(props.value ?? '');

    return (
        <Space vertical class={props.class(disabled() && 'cursor-not-allowed')} {...props}>
            {props.icon}
            <div
                class={
                    'flex w-full  rounded-xl border-2 border-solid  border-transparent px-4 py-1 shadow-suit transition-colors  duration-300 hover:border-blue-600'
                }
                classList={{
                    [Gradient.position]: true,
                    [Gradient.white]: true,
                }}
            >
                <input
                    placeholder={props.placeholder}
                    disabled={disabled()}
                    class="flex-1 bg-slate-100 px-2 text-slate-700 outline-none"
                    classList={{
                        'cursor-not-allowed': disabled(),
                    }}
                    type={canShow() ? 'text' : 'password'}
                    value={value()}
                    oninput={(e) => {
                        value((e.target as any).value);
                    }}
                ></input>
                {props.visibleIcon !== false && (
                    <div
                        class="flex items-center "
                        onClick={() => {
                            if (disabled()) return;
                            canShow((i) => !i);
                        }}
                    >
                        <Icon
                            class="text-slate-400"
                            name={canShow() ? 'visibility_off' : 'visibility'}
                        ></Icon>
                    </div>
                )}
            </div>
            {props.score}
        </Space>
    );
});
