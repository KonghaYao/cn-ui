import {
    type Atom,
    type JSXSlot,
    OriginComponent,
    atom,
    classHelper,
    createCtx,
    ensureFunctionResult,
    extendsEvent,
} from "@cn-ui/reactive";
import { type Accessor, For, Show, createEffect, createMemo } from "solid-js";
import { useStepper } from "solidjs-use";
import { GlobalButtonSlots } from "../button/ButtonSlots";
import "./index.css";
interface StepOptions {
    /** 如果没有，则指定 label 为 key */
    key?: string;
    label: string;
    content?: JSXSlot;

    icon?: JSXSlot<{ step: StepOptions; index: number }>;
}

export interface TimelineProps {
    options: StepOptions[];
    pending?: Atom<boolean>;
    /** dev */
    reverse?: boolean;
    /** dev */
    alternate?: boolean;
    horizontal?: boolean;
    expose?: (expose: TimelineExpose) => void;
}
export type TimelineExpose = ReturnType<typeof useStepController>;
export const TimelineCtx = createCtx<TimelineExpose>();

export const Timeline = OriginComponent<TimelineProps, HTMLUListElement, StepOptions>((props) => {
    const stepper = useStepController(() => props.options, {
        isCurrentPending: props.pending ?? atom(false),
    });
    stepper.syncModel(props.model);
    props.expose?.(stepper);
    return (
        <TimelineCtx.Provider value={stepper}>
            <ul
                class={props.class("flex", !props.horizontal && "flex-col")}
                style={props.style()}
                {...extendsEvent(props)}
            >
                <For each={stepper.steps()}>
                    {(step, index) => {
                        const isCurrent = () => stepper.isCurrent(stepper.getKeyFromOption(step));
                        return (
                            <li
                                class={classHelper.base("flex gap-4 relative ")(
                                    props.horizontal && "flex-col pr-4",
                                    "pb-4",
                                )}
                                data-index={index()}
                                aria-current={isCurrent() ? "step" : undefined}
                            >
                                <Show when={index() !== props.options.length - 1}>
                                    <div
                                        aria-hidden="true"
                                        class={classHelper.base("-z-1")(
                                            props.horizontal
                                                ? "cn-timeline-item-tail-col "
                                                : "cn-timeline-item-tail ",
                                            "",
                                        )}
                                    />
                                </Show>
                                <div class="select-none">
                                    {ensureFunctionResult(step.icon ?? DefaultTimelineIcon, [
                                        {
                                            step,
                                            index: index() + 1,
                                        },
                                    ])}
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
        </TimelineCtx.Provider>
    );
});

const DefaultTimelineIcon = (props: { step: StepOptions; index: number }) => {
    const stepper = TimelineCtx.use();
    const isCurrent = () => stepper.isCurrent(stepper.getKeyFromOption(props.step));
    return (
        <div
            class={classHelper.base(
                "mt-1 bg-design-primary  text-xs w-4 h-4 text-center rounded-full ",
            )(
                stepper.isAfter(stepper.getKeyFromOption(props.step)) &&
                    "border-3 border-success-600",
                stepper.isCurrentPending() && isCurrent() && "pl-[0.15rem]",
                isCurrent() && "border-3 border-primary-300",
                "border-3 border-gray-300",
            )}
        >
            <Show when={stepper.isCurrentPending() && isCurrent()}>
                {GlobalButtonSlots.useSlot("loadingIcon")}
            </Show>
        </div>
    );
};
function useStepController(
    steps: Accessor<StepOptions[]>,
    { isCurrentPending }: { isCurrentPending: Atom<boolean> },
) {
    const getKeyFromOption = (i: StepOptions) => i.key ?? i.label;
    const stepKeys = createMemo(() => steps().map(getKeyFromOption));
    const StepKeyToOption = createMemo(() => new Map(steps().map((i) => [i.key ?? i.label, i])));
    const stepper = useStepper(stepKeys);

    return {
        getKeyFromOption,
        ...stepper,
        isCurrentPending,
        StepKeyToOption,
        steps,
        syncModel(model: Atom<StepOptions>) {
            const currentKeyModel = model.reflux(getKeyFromOption(model()), (key) => {
                return StepKeyToOption().get(key)!;
            });
            stepper.goTo(currentKeyModel());
            createEffect(() => {
                currentKeyModel(stepper.current);
            });
        },
    };
}
