import { Atom, atom, atomization, OriginComponent } from '@cn-ui/use';
import { JSX, lazy, Suspense } from 'solid-js';

import { Icon } from '../../Icon';
import { Space } from '../../Space';
export interface PasswordScoreProps extends JSX.HTMLAttributes<HTMLDivElement> {
    userInputs?: string[];
    value?: Atom<string>;
}
interface PasswordProps extends PasswordScoreProps {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<string>;
    score?: boolean;
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
            <div class="w-full flex bg-slate-100 px-4 py-1 hover:border-blue-400 border-solid border-transparent border-2 rounded transition-colors duration-300 ">
                <input
                    disabled={disabled()}
                    class="flex-1  outline-none bg-slate-100 text-slate-600"
                    classList={{
                        'cursor-not-allowed': disabled(),
                    }}
                    type={canShow() ? 'text' : 'password'}
                    value={value()}
                    oninput={(e) => {
                        value((e.target as any).value);
                    }}
                ></input>
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
            </div>
            {props.score && (
                <Suspense>
                    <ScoreComp value={value} userInputs={props.userInputs}></ScoreComp>
                </Suspense>
            )}
        </Space>
    );
});
