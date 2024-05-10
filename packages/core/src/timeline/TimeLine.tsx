import {
    type JSXSlot,
    OriginComponent,
    OriginDiv,
    createCtx,
    ensureFunctionResult,
    extendsEvent,
} from "@cn-ui/reactive";
import { Accessor, For, JSXElement, Show, createMemo } from "solid-js";
import { type UseStepperReturn, useStepper } from "solidjs-use";
import { Icon } from "../icon";
import "./index.css";
interface StepOptions {
    /** 如果没有，则指定 label 为 key */
    key?: string;
    label: string;
    content?: JSXSlot;
    icon?: JSXSlot<number>;
}

export interface TimelineProps {
    options: StepOptions[];
}
export const TimelintCtx = createCtx<UseStepperReturn<string, string[], string>>();

export const Timeline = OriginComponent<TimelineProps, HTMLUListElement, StepOptions>((props) => {
    const getKeyFromOption = (i: StepOptions) => i.key ?? i.label;
    const stepKeys = createMemo(() => props.options.map(getKeyFromOption));
    const StepKeyToOption = createMemo(
        () => new Map(props.options.map((i) => [i.key ?? i.label, i])),
    );
    const stepper = useStepper(stepKeys);
    return (
        <TimelintCtx.Provider value={stepper}>
            <ul class={props.class("flex flex-col")} style={props.style()} {...extendsEvent(props)}>
                <For each={props.options}>
                    {(step, index) => {
                        return (
                            <li class="flex gap-4 relative pb-4">
                                <Show when={index() !== props.options.length - 1}>
                                    <div aria-hidden class="cn-timeline-item-tail -z-1"></div>
                                </Show>
                                <div>
                                    <div class="mt-1 bg-design-primary text-xs w-4 h-4 text-center rounded-full border">
                                        {ensureFunctionResult(step.icon ?? ((i: number) => i), [
                                            index() + 1,
                                        ])}
                                    </div>
                                </div>
                                <div>
                                    {step.label}
                                    {ensureFunctionResult(step.content)}
                                </div>
                            </li>
                        );
                    }}
                </For>
            </ul>
        </TimelintCtx.Provider>
    );
});
