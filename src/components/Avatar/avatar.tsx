import cs from '../_util/classNames';
import { AvatarProps } from './interface';
import {
    Component,
    createEffect,
    JSXElement,
    mergeProps,
    createMemo,
    Switch,
    Match,
} from 'solid-js';
import { GlobalConfigStore } from '../GlobalConfigStore';
import './style/index.less';
const defaultProps: AvatarProps = {
    shape: 'circle',
    autoFixFontSize: true,
};
const calcStr = (strOrNum: string | number, func: (int: number) => number) => {
    const result = parseInt(strOrNum as string);
    return strOrNum.toString().replace(result.toString(), func(result).toString());
};
export const Avatar: Component<AvatarProps & { children?: JSXElement }> = (props) => {
    const { componentConfig, rtl } = GlobalConfigStore;

    const merged = mergeProps(defaultProps, componentConfig?.Avatar, props);
    let textRef: HTMLSpanElement;
    let avatarRef: HTMLDivElement;
    createEffect(() => {
        if (textRef) {
            const textWidth = textRef.clientWidth;
            const size = merged.size || avatarRef.offsetWidth;
            const scale = parseInt(size as string) / (textWidth + 8);

            textRef.style.transform = `scale(${scale}) translateX(-50%)`;
        }
    });

    const classNames = createMemo(() => cs('cn-avatar', merged.shape, merged.className));

    return (
        <div
            ref={avatarRef}
            classList={{
                rtl: rtl,
            }}
            style={{
                '--size': typeof merged.size === 'number' ? merged.size + 'px' : merged.size,

                ...merged.style,
            }}
            class={classNames()}
            {...merged}
        >
            <Switch
                fallback={
                    <span
                        ref={textRef}
                        class="text"
                        style={{
                            'font-size': calcStr(merged.size, (i) => i / 2),
                        }}
                    >
                        {merged.children}
                    </span>
                }
            >
                <Match when={merged.src}>{<img class="img" src={merged.src}></img>}</Match>
            </Switch>
        </div>
    );
};
