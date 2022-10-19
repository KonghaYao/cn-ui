import { atom, Atom, reflect, useEventController, useSingleAsync } from '@cn-ui/use';
import { Component, For, lazy, Match, Show, Suspense, Switch } from 'solid-js';
import { FormTemplate, registerFormComponent } from './FormTemplate';
export * from './FormTemplate';
const useValidForm = (template: FormTemplate[], result: Atom<unknown>) => {
    const valids = template.reduce((col, i) => {
        if (i.valid) {
            col[i.prop] = reflect(() => {
                const stringOrNull = i.valid.call(null, result()[i.prop](), result());
                // string 代表错误信息，null 或者 undefined 代表通过
                return stringOrNull;
            });
        }
        return col;
    }, {});
    return { valids };
};

export const Form: Component<{
    value: Atom<unknown | null>;
    template: FormTemplate[];
}> = (props) => {
    const result = props.value;

    result(() =>
        props.template.reduce((col, i) => {
            col[i.prop] = atom(i.default ?? undefined);
            return col;
        }, {})
    );
    const { valids } = useValidForm(props.template, result);
    return (
        <For each={props.template}>
            {(item) => {
                const loader = registerFormComponent.get(item.type);
                if (loader) {
                    const Comp = lazy(loader);
                    return (
                        <>
                            <div class=" flex flex-wrap border-b border-solid border-gray-200 px-4 py-2  font-thin text-gray-700">
                                <label>{item.label ?? item.prop}</label>
                                <span class="flex-1"></span>
                                <Suspense>
                                    <Comp value={result()[item.prop]} options={item}></Comp>
                                </Suspense>
                                <Show when={valids[item.prop] && valids[item.prop]()}>
                                    <div class="w-full py-1 text-sm font-thin text-red-500">
                                        {valids[item.prop]()}
                                    </div>
                                </Show>
                            </div>
                        </>
                    );
                } else {
                    return;
                }
            }}
        </For>
    );
};
