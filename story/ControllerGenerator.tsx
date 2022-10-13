import { Component, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Tab, Tabs, TabsHeader } from '@cn-ui/core';

import { CodePreview } from './Controller/CodePreview';
export const ControllerGenerator: Component<{
    controller: any[];
    onChange: (key: string, value: any) => void;
}> = (props) => {
    const map = {
        select: ({
            default: defaultValue,
            options,
            prop,
        }: {
            default: string;
            options: { value: string; label?: string }[];
            prop: string;
        }) => {
            return (
                <select
                    value={defaultValue}
                    onchange={(e) => {
                        props.onChange(prop, (e.target as any).value);
                    }}
                >
                    <For each={options}>
                        {(i) => {
                            return <option value={i.value}>{i.label || i.value}</option>;
                        }}
                    </For>
                </select>
            );
        },
        switch: ({ default: defaultValue, prop }: { default: boolean; prop: string }) => {
            return (
                <input
                    type="checkbox"
                    checked={defaultValue}
                    onchange={(e) => props.onChange(prop, (e.target as any).checked)}
                />
            );
        },
        range: ({
            default: defaultValue,
            prop,
            unit,
            ...Props
        }: {
            default: string;
            prop: string;
            unit?: string;
        }) => {
            return (
                <input
                    type="range"
                    {...Props}
                    value={parseInt(defaultValue)}
                    onchange={(e) => props.onChange(prop, (e.target as any).value + (unit || 0))}
                />
            );
        },
    };
    return (
        <Tabs class="flex flex-col overflow-hidden border-t border-solid border-slate-300">
            <TabsHeader></TabsHeader>
            <Tab id="Props">
                <For each={props.controller}>
                    {(i) => {
                        // console.log(i);
                        return (
                            <div id={i.prop}>
                                {i.prop}
                                <Dynamic component={map[i.type]} {...i}></Dynamic>
                            </div>
                        );
                    }}
                </For>
            </Tab>
            <CodePreview></CodePreview>
        </Tabs>
    );
};
