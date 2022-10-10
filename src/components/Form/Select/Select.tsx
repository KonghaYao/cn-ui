import {
    Atom,
    atom,
    atomization,
    emitEvent,
    extendsEvent,
    OriginComponent,
    useEventController,
} from '@cn-ui/use';
import { Component, For, JSX } from 'solid-js';
import { createTrigger } from '../../Trigger';

interface SelectProps extends JSX.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean | Atom<boolean> /** 这里不允许注入静态参数 */;
    value?: Atom<string>;
    options: Atom<string[]>;
}
interface ListProps {
    options: Atom<string[]>;
    onSelect: (val: string) => void;
}
const OptionsList: Component<ListProps> = (props) => {
    // console.log('渲染', props.options());
    return (
        <div class="overflow-y-auto overflow-x-hidden" style="max-height:50vh; max-width:20em">
            <For each={props.options()}>
                {(item) => {
                    return (
                        <div
                            class="cursor-pointer hover:bg-slate-600 transition-colors duration-300 px-2 "
                            onclick={() => props.onSelect(item)}
                        >
                            {item}
                        </div>
                    );
                }}
            </For>
        </div>
    );
};
export const Select = OriginComponent<SelectProps>((props) => {
    const disabled = atomization(props.disabled ?? false);
    const value = atomization(props.value ?? '');
    const control = useEventController({ disabled });
    const loading = atom(false);
    const visible = atom(false);
    const popupContent = (
        <OptionsList
            options={props.options}
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
                ' px-2 text-slate-700 rounded h-6 text-ellipsis overflow-hidden whitespace-nowrap bg-slate-200 transition-all duration-300 ease-in-out'
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
            {value()}
        </button>
    );
});
