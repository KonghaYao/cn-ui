import { createMemo, createSelector, For, JSX, onMount } from 'solid-js';
import { Atom, atomization, extendsEvent, reflect } from '@cn-ui/use';

import { OriginComponent } from '@cn-ui/use';

interface CascaderProps extends JSX.HTMLAttributes<HTMLDivElement> {
    options: string[][] | Atom<string[][]>;
    value: string[] | Atom<string[]>;
}
import { AtomToArray } from '@cn-ui/use';
import { Gradient } from '../_util/design';

/** 级联选择器，用于选择重叠的数据 */
export const Cascader = OriginComponent<CascaderProps, HTMLDivElement>((props) => {
    const options = AtomToArray(atomization(props.options));

    const value = atomization(props.value);

    return (
        <div
            class={props.class(
                'flex max-h-64 bg-gradient-to-b font-thin text-slate-700 shadow-suit',
                Gradient.white
            )}
            style={props.style}
            ref={props.ref}
            {...extendsEvent(props)}
        >
            {/* 横向的布局 */}
            <For each={options}>
                {(subArray, index) => {
                    const isSelected = createSelector(createMemo(() => value()[index()]));
                    return (
                        <div class="scroll-box-none flex flex-1 flex-col overflow-x-auto  ">
                            <For each={subArray()}>
                                {(item) => {
                                    return (
                                        <div
                                            class="cursor-pointer text-ellipsis whitespace-nowrap rounded-md p-2 text-center transition-colors duration-300"
                                            classList={{
                                                'bg-slate-50': isSelected(item),
                                                'text-blue-600': isSelected(item),
                                            }}
                                            onClick={() => {
                                                value((i) => {
                                                    const newArray = [...i];
                                                    // 删除后面的级联选项
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
