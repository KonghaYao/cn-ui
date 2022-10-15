import { For } from 'solid-js';
import { ControllerFuncs } from '../types/ControllerFuncs';

export const Inputs = {
    select: ({ defaultValue, options, prop, onChange }: ControllerFuncs.Select) => {
        return (
            <select
                value={defaultValue}
                onchange={(e) => {
                    onChange(prop, (e.target as any).value);
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
    switch: ({ defaultValue, prop, onChange }: ControllerFuncs.Switch) => {
        return (
            <input
                type="checkbox"
                checked={defaultValue}
                onchange={(e) => onChange(prop, (e.target as any).checked)}
            />
        );
    },
    range: ({ defaultValue, prop, unit, onChange, ...Props }: ControllerFuncs.Range) => {
        return (
            <input
                type="range"
                {...Props}
                value={parseInt(defaultValue as string)}
                onChange={(e) =>
                    /**@ts-ignore */
                    onChange(prop, parseInt((e.target as any).value) + (unit ?? 0))
                }
            />
        );
    },
};
