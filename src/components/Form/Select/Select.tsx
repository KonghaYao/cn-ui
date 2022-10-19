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
import { createTrigger } from '../../Trigger';

type OptionCreator = { value: string; label?: string };

interface SelectProps extends JSX.HTMLAttributes<HTMLButtonElement> {
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
        <div class="overflow-y-auto overflow-x-hidden" style="max-height:50vh; max-width:20em">
            <For each={props.options()}>
                {(item) => {
                    return (
                        <div
                            class="cursor-pointer px-2 transition-colors duration-300 hover:bg-slate-600 "
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
    const value = atomization(
        options().find((i) => i.value === props.value().value) || options()[0]
    );

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
        <button
            class={props.class(
                ' h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded bg-slate-200 px-2 text-slate-700 transition-all duration-300 ease-in-out'
            )}
            classList={{
                'opacity-70': disabled() || loading(),
            }}
            style={{ ...props.style, 'min-width': '6em' }}
            ref={createTrigger({
                hideOnClick: false,
                interactive: true,
                onClickOutside() {
                    visible(false);
                },
                placement: 'bottom',
                content: popupContent,
                trigger: 'click',
                visible,
                disabled,
            })}
            {...extendsEvent(props)}
        >
            {value().label ?? value().value}
        </button>
    );
});
