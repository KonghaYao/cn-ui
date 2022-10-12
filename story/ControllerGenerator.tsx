import { Component, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Tab, Tabs, TabsHeader } from '@cn-ui/core';
import { Code, refractor } from '@cn-ui/highlight/src/index';
import tsx from 'refractor/lang/tsx.js';
refractor.register(tsx);
import { useViewing } from './hook/useViewing';
export const ControllerGenerator: Component<{
    controller: any[];
    onChange: (key: string, value: any) => void;
}> = (props) => {
    const { viewing } = useViewing();
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
        <Tabs class="flex flex-col overflow-hidden">
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
            <Tab id="Story" class="flex-1 overflow-auto">
                <div class="overflow-auto p-4">
                    <Code lang="tsx">{viewing().code}</Code>
                </div>
            </Tab>
        </Tabs>
    );
};
