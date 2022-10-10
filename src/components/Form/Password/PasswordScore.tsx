import { extendsEvent, OriginComponent, reflect } from '@cn-ui/use';
import { For } from 'solid-js';
import zxcvbn from 'zxcvbn';
import { PasswordScoreProps } from './Password';

/** 这个组件一般会被异步载入 */
export const PasswordScore = OriginComponent<PasswordScoreProps>((props) => {
    const score = reflect<number>(() => {
        return props.value() ? zxcvbn(props.value(), props.userInputs ?? []).score + 1 : 0;
    });
    return (
        <div
            class={props.class('w-full my-0 flex ')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <For each={[...Array(5).keys()]}>
                {(item) => {
                    return (
                        <div
                            class=" h-1 flex-1 mx-1 rounded bg-slate-300 transition"
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
