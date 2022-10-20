import { Component, createEffect, Show, useContext } from 'solid-js';
import { Form, Tab, Tabs, TabsHeader } from '@cn-ui/core';

import { CodePreview } from './Controller/CodePreview';
import { StoryContext } from './StoryShower';
import {
    FormSwitch,
    FromSelect,
    registerFormComponent,
    FromRate,
    FromColor,
    FromText,
    FormNumber,
    FormSlider,
    FormRadio,
} from '@cn-ui/core';
import { atom } from '@cn-ui/use';
registerFormComponent.set('switch', () => Promise.resolve({ default: FormSwitch }));
registerFormComponent.set('select', () => Promise.resolve({ default: FromSelect }));
registerFormComponent.set('rate', () => Promise.resolve({ default: FromRate }));
registerFormComponent.set('color', () => Promise.resolve({ default: FromColor }));
registerFormComponent.set('text', () => Promise.resolve({ default: FromText }));
registerFormComponent.set('range', () => Promise.resolve({ default: FormNumber }));
registerFormComponent.set('slider', () => Promise.resolve({ default: FormSlider }));
registerFormComponent.set('radio', () => Promise.resolve({ default: FormRadio }));
export const ControllerGenerator: Component<{}> = () => {
    const { Controller, Props } = useContext(StoryContext);
    const val = atom({});
    createEffect(() => {
        Props(() => {
            const data = val();
            const info = Object.fromEntries(
                Object.entries(data).map((i) => {
                    /** @ts-ignore */
                    const val = i[1]();
                    if (typeof val === 'object') {
                        return [i[0], val.value];
                    } else {
                        return [i[0], val];
                    }
                })
            );
            return info;
        });
    });
    return (
        <Tabs class="flex flex-col overflow-hidden border-t border-solid border-slate-300">
            <TabsHeader></TabsHeader>
            <Tab id="Props" class="flex-1 overflow-auto">
                <div class="m-2 rounded-2xl bg-white">
                    <Show when={Controller().length}>
                        <Form template={Controller()} value={val}></Form>
                    </Show>

                    <div class="h-4 w-full"></div>
                </div>
            </Tab>
            <CodePreview></CodePreview>
        </Tabs>
    );
};
