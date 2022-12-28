import { For } from 'solid-js';
import { Tabs, Tab, TabsHeader } from '@cn-ui/core';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'destroyOnHide',
    },
];
import { Animate } from '@cn-ui/animate';
import '@cn-ui/animate/src/zoom.css';
export default (props) => {
    const data = [...Array(5).keys()];
    return (
        <>
            <Tabs activeId={'1'}>
                <div class="ExtraNode">
                    {/* 可以自定义表头, 原始是没有表头的 */}
                    <TabsHeader></TabsHeader>
                    {/* 使用动画，但是动画只有在组件销毁时触发 */}
                    {/* 可以深层嵌套使用 */}
                    <div class="ExtraNode">
                        <Animate anime="zoom" group extraClass="absolute">
                            <For each={data}>
                                {(item) => {
                                    return (
                                        <Tab id={item.toString()} {...props}>
                                            {item}
                                        </Tab>
                                    );
                                }}
                            </For>
                        </Animate>
                    </div>
                </div>
            </Tabs>
        </>
    );
};
