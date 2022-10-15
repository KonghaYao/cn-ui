import { Component, For, useContext } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Tab, Tabs, TabsHeader } from '@cn-ui/core';

import { CodePreview } from './Controller/CodePreview';
import { StoryContext } from './StoryShower';
import { Inputs } from './Inputs/Inputs';

export const ControllerGenerator: Component<{}> = () => {
    const { Controller, Props, refresh } = useContext(StoryContext);
    const onChange = (name: string, value: unknown) => {
        Props((props) => {
            props[name] = value;
            return { ...props };
        });
    };

    return (
        <Tabs class="flex flex-col overflow-hidden border-t border-solid border-slate-300">
            <TabsHeader></TabsHeader>
            <Tab id="Props">
                <For each={Controller()}>
                    {(i) => {
                        // console.log(i);
                        return (
                            <div id={i.prop}>
                                {i.prop}
                                <Dynamic
                                    component={Inputs[i.type]}
                                    defaultValue={i.default}
                                    {...i}
                                    onChange={(...args) => {
                                        i.refresh && refresh();
                                        /** @ts-ignore */
                                        return onChange(...args);
                                    }}
                                ></Dynamic>
                            </div>
                        );
                    }}
                </For>
            </Tab>
            <CodePreview></CodePreview>
        </Tabs>
    );
};
