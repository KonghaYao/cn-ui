import { For, JSX } from 'solid-js';
import { Atom, atomization } from '@cn-ui/use';

import { OriginComponent } from '@cn-ui/use';

interface CascaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    options: string[][] | Atom<string[][]>;
    value: string[] | Atom<string[]>;
}
export const Cascader = OriginComponent<CascaderProps, HTMLDivElement>((props) => {
    const options = atomization(props.options);
    const value = atomization(props.value);
    return (
        <div class={props.class('flex max-h-64')} style={props.style} ref={props.ref}>
            <For each={options()}>
                {(subArray, index) => {
                    return (
                        <div class="flex-1 flex flex-col overflow-x-auto">
                            <For each={subArray}>
                                {(item) => (
                                    <div
                                        class="text-center"
                                        classList={{
                                            'bg-gray-100': item === value()[index()],
                                        }}
                                        onclick={() => {
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
                                )}
                            </For>
                        </div>
                    );
                }}
            </For>
        </div>
    );
});
