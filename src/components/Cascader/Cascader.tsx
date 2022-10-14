import { createMemo, For, JSX, onMount } from 'solid-js';
import { Atom, atomization, extendsEvent, reflect } from '@cn-ui/use';

import { OriginComponent } from '@cn-ui/use';

interface CascaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    options: string[][] | Atom<string[][]>;
    value: string[] | Atom<string[]>;
}
import { AtomToArray } from '@cn-ui/use';
export const Cascader = OriginComponent<CascaderProps, HTMLDivElement>((props) => {
    const options = AtomToArray(atomization(props.options));

    const value = atomization(props.value);

    return (
        <div
            class={props.class('flex max-h-64 font-thin text-slate-700')}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            <For each={options}>
                {(subArray, index) => {
                    onMount(() => {
                        console.log('rerend', index());
                    });
                    return (
                        <div class="scroll-box-none flex flex-1 flex-col overflow-x-auto  ">
                            <For each={subArray()}>
                                {(item) => {
                                    const isSelect = createMemo(() => item === value()[index()]);
                                    return (
                                        <div
                                            class="m-2 cursor-pointer text-ellipsis whitespace-nowrap rounded-md text-center transition-colors duration-300"
                                            classList={{
                                                'bg-slate-50': isSelect(),
                                                'text-blue-600': isSelect(),
                                            }}
                                            onClick={() => {
                                                value((i) => {
                                                    const newArray = [...i];
                                                    newArray.splice(
                                                        index(),
                                                        newArray.length - index(),
                                                        item
                                                    );
                                                    return newArray;
                                                });
                                            }}
                                        >
                                            {item}
                                        </div>
                                    );
                                }}
                            </For>
                        </div>
                    );
                }}
            </For>
        </div>
    );
});
