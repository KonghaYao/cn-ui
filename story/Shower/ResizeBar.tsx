import { batch, For, useContext } from 'solid-js';
import { createTrigger, Icon, InputNumber, Space } from '@cn-ui/core';
import { StoryControlContext } from '../StoryShower';

const sizes = [
    { name: 'iPad Air', size: '820x1180' },
    { name: 'iPad Mini', size: '768x1024' },
    { name: 'iPhone 12 Pro', size: '390x844' },
    { name: 'iPhone XR', size: '414x896' },
    { name: 'iPhone SE', size: '375x667' },
];

export const ResizeBar = () => {
    const { height, width, scale } = useContext(StoryControlContext);
    const IconSetting = { size: 20, class: 'cursor-pointer hover:scale-125 transition-transform' };
    const Devices = (
        <Space vertical>
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
                <Icon name="refresh" {...IconSetting}></Icon>
                <Icon name="swipe_right" {...IconSetting}></Icon>
            </Space>
            <Space>
                <InputNumber
                    value={scale}
                    min={0}
                    max={100}
                    class="w-24 overflow-hidden"
                    step={1}
                ></InputNumber>
                <Icon
                    name="settings_overscan"
                    {...IconSetting}
                    onClick={() => {
                        scale(100);
                    }}
                ></Icon>
            </Space>
            <Space>
                <Icon
                    name="devices"
                    ref={createTrigger({
                        interactive: true,
                        content: Devices,
                    })}
                ></Icon>
                <InputNumber value={width} min={0} class="w-16 overflow-hidden"></InputNumber>
                <Icon
                    name="screen_rotation"
                    {...IconSetting}
                    onClick={() => {
                        batch(() => {
                            const h = height();
                            const w = width();
                            width(h);
                            height(w);
                        });
                    }}
                ></Icon>
                <InputNumber value={height} min={0} class="w-16 overflow-hidden"></InputNumber>
            </Space>
        </Space>
    );
};
