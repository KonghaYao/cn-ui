import { atom, Atom } from '@cn-ui/use';
import { Component, For, lazy, Match, Suspense, Switch } from 'solid-js';
export namespace FormFieldOptions {
    export interface ExtraSystemMessage {
        onChange?: <T>(key: string, value: T) => void;
    }
    export interface commonProp {
        prop: string;
        /** 默认为 prop */
        label?: string;
    }
    export type baseProp = ExtraSystemMessage & commonProp;
    export type WithDefault<T> = {
        default?: T;
    };
    export interface Select extends baseProp, WithDefault<string> {
        type: 'select';
        options: { value: string; label?: string }[];
    }
    export interface Switch extends baseProp, WithDefault<boolean> {
        type: 'switch';
    }
    export interface Range extends baseProp, WithDefault<string | number> {
        type: 'range';
        unit?: string;
    }
}

export type FormTemplate =
    | FormFieldOptions.Select
    | FormFieldOptions.Switch
    | FormFieldOptions.Range;
export const registerFormComponent = new Map<string, Parameters<typeof lazy>[0]>();
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

    return (
        <For each={props.template}>
            {(item) => {
                const loader = registerFormComponent.get(item.type);
                if (loader) {
                    const Comp = lazy(loader);
                    return (
                        <div>
                            <label>{item.label ?? item.prop}</label>
                            <Suspense>
                                <Comp value={result()[item.prop]} options={item}></Comp>
                            </Suspense>
                        </div>
                    );
                } else {
                    return;
                }
            }}
        </For>
    );
};
