import { Atom, atom, atomization, classNames, OriginComponent, reflect } from '@cn-ui/use';
import { For, JSX } from 'solid-js';
import zxcvbn from 'zxcvbn';
import { Space } from '../Space';
interface PasswordProps extends PasswordScoreProps {}
export const Password = OriginComponent<PasswordProps>((props) => {
    const canShow = atom(false);
    const value = atomization(props.value ?? '');

    return (
        <>
            <Space vertical class={props.class()} style={props.style} ref={props.ref}>
                <div class="w-full flex">
                    <input
                        class="flex-1 bg-gray-100 outline-none px-4 py-1 focus:border-blue-400 border-solid border-transparent border-2 rounded transition-colors duration-300"
                        type={canShow() ? 'text' : 'password'}
                        value={value()}
                        oninput={(e) => {
                            value((e.target as any).value);
                        }}
                    ></input>
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
