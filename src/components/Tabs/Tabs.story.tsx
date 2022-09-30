import { For } from 'solid-js';
import { atom } from 'solid-use';
import { Space } from '../Space';
import { Tabs, Tab, TabsHeader } from './tabs';
export const Controller = [
    {
        type: 'switch',
        default: true,
        prop: 'destroyOnHide',
    },
    {
        type: 'switch',
        default: false,
        prop: 'bordered',
    },
];

import 'animate.css/source/fading_entrances/fadeInDown.css';
import 'animate.css/source/fading_exits/fadeOutUp.css';
import { TransitionGroup } from '../../Transition/TransitionGroup';
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => resolve(null), ms);
    });
export default (props) => {
    const data = [...Array(5).keys()];
    return (
        <>
            <Tabs>
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
