import { extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { For, useContext } from 'solid-js';
import zxcvbn from 'zxcvbn';
import { PasswordContext, PasswordScoreProps } from '@cn-ui/core';

/** 这个组件一般会被异步载入 */
export const PasswordScore = OriginComponent<PasswordScoreProps>((props) => {
    const { value } = useContext(PasswordContext);
    const score = reflect<number>(() => {
        return value() ? zxcvbn(value(), props.userInputs ?? []).score + 1 : 0;
    });
    return (
        <div class={props.class('my-0 flex w-full ')} style={props.style} {...extendsEvent(props)}>
            <For each={[...Array(5).keys()]}>
                {(item) => {
                    return (
                        <div
                            class=" mx-1 h-1 flex-1 rounded bg-slate-300 transition"
                            classList={{
                                // ! tailwind 的一个毛病，只有写在 class 中才会被识别。。。
                                [reflect(() => {
                                    const s = score();
                                    return s > 3
                                        ? 'bg-green-500'
                                        : s > 1
                                        ? 'bg-orange-500'
                                        : 'bg-red-500';
                                })()]: item < score(),
                            }}
                        ></div>
                    );
                }}
            </For>
        </div>
    );
});
