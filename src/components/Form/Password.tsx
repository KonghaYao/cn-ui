import { Atom, atom, atomization, classNames, OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX } from 'solid-js';
import zxcvbn from 'zxcvbn';
import { Icon } from '../Icon';
import { Space } from '../Space';
interface PasswordProps extends PasswordScoreProps {
    disabled?: boolean | Atom<boolean>;
}
export const Password = OriginComponent<PasswordProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const canShow = atom(false);
    const value = atomization(props.value ?? '');

    return (
        <>
            <Space
                vertical
                class={props.class(disabled() && 'cursor-not-allowed')}
                style={props.style}
                ref={props.ref}
            >
                <div class="w-full flex bg-gray-100 px-4 py-1 hover:border-blue-400 border-solid border-transparent border-2 rounded transition-colors duration-300 ">
                    <input
                        disabled={disabled()}
                        class="flex-1  outline-none bg-gray-100 text-gray-600"
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
                            class="text-gray-400"
                            name={canShow() ? 'visibility_off' : 'visibility'}
                        ></Icon>
                    </div>
                </div>
                <PasswordScore value={value}></PasswordScore>
            </Space>
        </>
    );
});
interface PasswordScoreProps extends JSX.HTMLAttributes<HTMLDivElement> {
    userInputs?: string[];
    /** 这里不允许注入静态参数 */
    value?: Atom<string>;
}
export const PasswordScore = OriginComponent<PasswordScoreProps>((props) => {
    const score = reflect<number>(() => {
        return props.value() ? zxcvbn(props.value(), props.userInputs ?? []).score + 1 : 0;
    });
    const color = reflect(() => {
        const s = score();
        return s > 3 ? 'bg-green-400' : s > 1 ? 'bg-orange-400' : 'bg-red-400';
    });
    return (
        <div class={props.class('w-full my-0 flex ')} style={props.style} ref={props.ref}>
            <For each={[...Array(5).keys()]}>
                {(item) => {
                    return (
                        <div
                            class={'h-1 flex-1 mx-1 rounded bg-gray-300 transition'}
                            classList={{
                                [color()]: item < score(),
                            }}
                        ></div>
                    );
                }}
            </For>
        </div>
    );
});
