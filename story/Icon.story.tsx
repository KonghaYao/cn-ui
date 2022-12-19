import { Icon, InputText, Message, Space } from '@cn-ui/core';
import { atom, reflect } from '@cn-ui/use';
import copy from 'copy-to-clipboard';
import { createResource, For } from 'solid-js';

export const Controller = [
    {
        type: 'switch',
        default: false,
        prop: 'spin',
    },
    {
        type: 'range',
        default: 41,
        prop: 'size',
        min: 0,
        max: 100,
    },
];
Message.init();
export default (props) => {
    const [totals] = createResource<string[]>(() =>
        fetch('https://cdn.jsdelivr.net/gh/marella/material-icons/_data/versions.json', {
            cache: 'force-cache',
        })
            .then((res) => res.json())
            .then((res) => Object.keys(res))
    );
    const searchText = atom('');
    const filtered = reflect(() => {
        const text = searchText();
        if (text === '') {
            return totals() || [];
        } else {
            const reg = new RegExp(text);
            return totals().filter((i) => reg.test(i));
        }
    });
    return (
        <div class="flex h-screen flex-col ">
            <div class="m-4 text-blue-500">
                <div>Find {filtered().length}</div>
                <InputText value={searchText}></InputText>
            </div>

            <Space
                class="scroll-box-none flex-1 content-start overflow-auto text-slate-600"
                wrap
                onClick={(e) => {
                    if (e.target.classList.contains('cn-icon-font')) {
                        copy(e.target.textContent);
                        Message.success('复制成功');
                    }
                }}
            >
                <For each={filtered()}>
                    {(item) => {
                        return (
                            <Space vertical>
                                <Icon name={item} {...props}></Icon>
                            </Space>
                        );
                    }}
                </For>
            </Space>
        </div>
    );
};
