import { Component, For } from 'solid-js';
import { Dynamic } from 'solid-js/web';

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
        range: ({ default: defaultValue, prop, ...Props }: { default: string; prop: string }) => {
            return (
                <input
                    type="range"
                    {...Props}
                    value={parseInt(defaultValue)}
                    onchange={(e) => props.onChange(prop, (e.target as any).value + 'px')}
                />
            );
        },
    };
    return (
        <main>
            <For each={props.controller}>
                {(i) => {
                    // console.log(i);
                    return (
                        <div>
                            {i.prop}
                            <Dynamic component={map[i.type]} {...i}></Dynamic>
                        </div>
                    );
                }}
            </For>
        </main>
    );
};
