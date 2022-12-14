import { For } from 'solid-js';
import { atom } from '@cn-ui/use';
import { Button, Collapse, CollapseItem } from '@cn-ui/core';
export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'accordion',
    },
    {
        type: 'switch',
        default: false,
        prop: 'destroyOnHide',
        refresh: true,
    },
    {
        type: 'switch',
        default: false,
        prop: 'lazyload',
        refresh: true,
    },
];
export default (props) => {
    const data = [...Array(5).keys()].map((i) => {
        return {
            label: '标签 ' + i,
            name: 'tag ' + i,
            value: atom(!!(i % 2)),
            content: [...Array(i + 1).keys()].map((ii) => <span>{ii}</span>),
        };
    });
    const Value = data[0].value;
    return (
        <>
            <Button size="mini" onClick={() => Value(!Value())}>
                受控标签: {Value() ? 'true' : 'false'}
            </Button>
            <div class="mx-4 my-2 ">
                <Collapse
                    {...props}
                    class="overflow-hidden rounded-xl border border-solid border-slate-200 text-gray-700"
                    onPanelChange={(...args) => {
                        console.log(args);
                    }}
                >
                    <For each={data}>
                        {(item) => {
                            return (
                                <CollapseItem
                                    id={item.name}
                                    header={item.label}
                                    name={item.name}
                                    value={item.value}
                                >
                                    <div class="px-4 py-1 text-slate-500">
                                        {item.content}
                                        <div>43434</div>
                                        <div>43434</div>
                                        <div>43434</div>
                                        <div>43434</div>
                                        <div>43434</div>
                                    </div>
                                </CollapseItem>
                            );
                        }}
                    </For>
                </Collapse>
            </div>
        </>
    );
};
