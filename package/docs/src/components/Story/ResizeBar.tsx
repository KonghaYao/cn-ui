import { batch, For, useContext } from 'solid-js';
import { FloatPanel, InputNumber, Space } from '@cn-ui/core';
import { StoryContext } from './StoryRoot';
import { BackOne, Phone, Refresh, RefreshOne } from 'icon-park-solid';
const sizes = [
    { name: 'iPad Air', size: '820x1180' },
    { name: 'iPad Mini', size: '768x1024' },
    { name: 'iPhone 12 Pro', size: '390x844' },
    { name: 'iPhone XR', size: '414x896' },
    { name: 'iPhone SE', size: '375x667' },
];
import '@cn-ui/animate/src/scale.css';
import '@cn-ui/animate/src/base.css';
export const ResizeBar = () => {
    const { height, width, scale, refresh } = useContext(StoryContext)!;
    const createDevices = () => (
        <Space vertical class="z-10 bg-white">
            <For each={sizes}>
                {(item) => {
                    return (
                        <div
                            class="w-full hover:bg-slate-700"
                            onClick={() => {
                                const [w, h] = item.size.split('x').map((i) => parseInt(i));
                                batch(() => {
                                    width(w);
                                    height(h);
                                });
                            }}
                        >
                            {item.name}
                        </div>
                    );
                }}
            </For>
        </Space>
    );
    return (
        <Space
            class="select-none justify-center border-b border-solid border-slate-300 text-blue-500"
            size="large"
        >
            <Space>
                <Refresh
                    theme="outline"
                    size="26"
                    fill="#7c7c7c"
                    strokeWidth={4}
                    onClick={refresh}
                ></Refresh>
            </Space>
            <Space>
                <InputNumber
                    value={scale}
                    min={0}
                    max={200}
                    class="w-24 overflow-hidden"
                    step={1}
                ></InputNumber>
                <BackOne
                    theme="outline"
                    size="26"
                    fill="#333"
                    strokeLinejoin="bevel"
                    strokeLinecap="square"
                    onClick={() => scale(100)}
                ></BackOne>
            </Space>
            <div class=" flex items-center gap-4">
                <FloatPanel popup={createDevices}>
                    <Phone
                        theme="outline"
                        size="26"
                        fill="#333"
                        strokeLinejoin="bevel"
                        strokeLinecap="square"
                    />
                </FloatPanel>
                {width()}
                <RefreshOne
                    theme="outline"
                    size="26"
                    fill="#333"
                    strokeLinejoin="bevel"
                    strokeLinecap="square"
                    onClick={() => {
                        batch(() => {
                            const h = height();
                            const w = width();
                            width(h);
                            height(w);
                        });
                    }}
                ></RefreshOne>
                {height()}
            </div>
        </Space>
    );
};
