import { For } from 'solid-js';
import { Tabs, Tab, TabsHeader, Button } from '@cn-ui/core';
import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutUp.css';
import { TransitionGroup } from '@cn-ui/transition';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'destroyOnHide',
    },
];

export default (props) => {
    const data = [...Array(5).keys()];
    return (
        <>
            {/* TODO Check */}
            <Tabs activeId={'1'}>
                <div class="ExtraNode">
                    {/* 可以自定义表头, 原始是没有表头的 */}
                    <TabsHeader></TabsHeader>
                    {/* 使用动画，但是动画只有在组件销毁时触发 */}
                    {/* 可以深层嵌套使用 */}
                    <div class="ExtraNode">
                        <TransitionGroup
                            {...{
                                enterActiveClass: 'animated fadeInDown',
                                exitActiveClass: 'animated fadeOutUp',
                            }}
                        >
                            <For each={data}>
                                {(item) => {
                                    return (
                                        <Tab id={item.toString()} {...props}>
                                            {item}
                                        </Tab>
                                    );
                                }}
                            </For>
                        </TransitionGroup>
                    </div>
                </div>
            </Tabs>
        </>
    );
};
