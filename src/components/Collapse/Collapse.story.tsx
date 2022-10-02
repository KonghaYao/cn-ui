import { For } from 'solid-js';
import { atom } from '../_util/atom';
import { Collapse, CollapseItem } from './index';
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
    },
    {
        type: 'switch',
        default: false,
        prop: 'lazyload',
    },
    {
        type: 'select',
        default: 'square',
        prop: 'shape',
        options: ['square', 'circle', 'round'].map((i) => ({ value: i })),
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
    // 想要获取 所有标签的打开值:
    //  data.map((i) => i.value());
    const Value = data[0].value;
    return (
        <>
            <button onclick={() => Value(!Value())}>受控标签: {Value() ? 'true' : 'false'}</button>
            <Collapse
                {...props}
                onPanelChange={(...args) => {
                    console.log(args);
                }}
            >
                <For each={data}>
                    {(item) => {
                        return (
                            <CollapseItem header={item.label} name={item.name} value={item.value}>
                                {item.content}
                                <div>43434</div>
                                <div>43434</div>
                                <div>43434</div>
                                <div>43434</div>
                                <div>43434</div>
                            </CollapseItem>
                        );
                    }}
                </For>
            </Collapse>
        </>
    );
};
