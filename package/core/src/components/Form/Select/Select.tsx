import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    reflect,
    useEventController,
} from '@cn-ui/use';
import { Component, For, JSX } from 'solid-js';
import { Trigger } from '@cn-ui/core';
import { Gradient } from '../../_util/design';

/** Select 组件的对象输入参数 */
export type OptionCreator = { value: string; label?: string };

export interface SelectProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<OptionCreator>;
    options: string[] | OptionCreator[] | Atom<OptionCreator[]>;
}
interface ListProps {
    options: Atom<OptionCreator[]>;
    onSelect: (val: { value: string; label?: string }) => void;
}
const OptionsList: Component<ListProps> = (props) => {
    // console.log('渲染', props.options());
    return (
        <div
            class="overflow-y-auto overflow-x-hidden"
            classList={{
                [Gradient.position]: true,
                [Gradient.white]: true,
            }}
            style="max-height:50vh; max-width:20em"
        >
            <For each={props.options()}>
                {(item) => {
                    return (
                        <div
                            class="cursor-pointer px-2 text-slate-700 transition-colors duration-300 hover:bg-slate-200 "
                            onclick={() => props.onSelect(item)}
                        >
                            {item.label ?? item.value}
                        </div>
                    );
                }}
            </For>
        </div>
    );
};
export const Select = OriginComponent<SelectProps>((props) => {
    const disabled = atomization(props.disabled ?? false);

    // 重新构建 options，使之全部成为 对象
    const inputOptions = atomization(props.options);
    const options = reflect(() => {
        return inputOptions().map((i: string | OptionCreator) => {
            return typeof i === 'string' ? { value: i } : i;
        });
    });

    // 在 Options 中选中一个值，如果不是，那么将会使用第一个
    props.value((init) => options().find((i) => i.value === init.value) || options()[0]);
    const value = atomization(props.value);

    const control = useEventController({ disabled });

    const loading = atom(false);
    const visible = atom(false);
    const popupContent = (
        <OptionsList
            options={options}
            onSelect={control(
                [
                    emitEvent(props.onClick as () => boolean),

                    (val) => {
                        value(val);
                        visible(false);
                    },
                ],
                { loading }
            )}
        ></OptionsList>
    );
    return (
        <Trigger
            hideOnClick={false}
            interactive
            onClickOutside={() => {
                visible(false);
            }}
            placement="bottom"
            content={popupContent}
            trigger="click"
            visible={visible}
            disabled={disabled}
        >
            <button
                class={props.class(
                    ' h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded px-2 text-slate-700 shadow-xl transition-all duration-300  ease-in-out hover:ring-1 hover:ring-blue-600',
                    Gradient.position,
                    Gradient.white
                )}
                classList={{
                    'opacity-70': disabled() || loading(),
                }}
                style={{ ...props.style, 'min-width': '6em' }}
                {...extendsEvent(props)}
            >
                {value().label ?? value().value}
            </button>
        </Trigger>
    );
});
