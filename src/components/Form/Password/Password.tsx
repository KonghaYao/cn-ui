import { Atom, atom, atomization, OriginComponent } from '@cn-ui/use';
import { JSX, JSXElement, lazy, Suspense } from 'solid-js';

import { Icon, Space } from '@cn-ui/core';
import { FormField } from '../interface';
export interface PasswordScoreProps extends FormField {
    userInputs?: string[];
    value: Atom<string>;
}
export interface PasswordProps extends PasswordScoreProps {
    /** @zh 是否加载评分等级系统 */
    score?: boolean;
    icon?: JSXElement;
    visibleIcon?: boolean;
}
export const Password = OriginComponent<PasswordProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const canShow = atom(false);
    const value = atomization(props.value ?? '');
    const ScoreComp = lazy(async () => {
        const comp = await import('./PasswordScore');
        return { default: comp.PasswordScore };
    });
    return (
        <Space vertical class={props.class(disabled() && 'cursor-not-allowed')} {...props}>
            {props.icon}
            <div class="flex w-full rounded border-2 border-solid border-transparent bg-slate-100 px-4 py-1 transition-colors duration-300 hover:border-blue-400 ">
                <input
                    disabled={disabled()}
                    class="flex-1  bg-slate-100 text-slate-600 outline-none"
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
            {props.score && (
                <Suspense>
                    <ScoreComp value={value} userInputs={props.userInputs}></ScoreComp>
                </Suspense>
            )}
        </Space>
    );
});
