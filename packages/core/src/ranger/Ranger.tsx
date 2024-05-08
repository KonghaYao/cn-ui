import { NullAtom, OriginComponent, classHelper, createCtx } from "@cn-ui/reactive";
import { For, Match, Show, Switch } from "solid-js";
import { useRanger } from "./solid-range";

export interface RangerProps {
    min?: number;
    max?: number;
    stepSize?: number;
    tickSize?: number;
    steps?: number[];
    ticks?: number[];
    /** range 情况下允许范围重叠  */
    allowOverlap?: boolean;
    mode?: "single" | "multiple" | "range";
}

export const RangerCtx = createCtx<ReturnType<typeof useRanger<HTMLDivElement>>>();

export const Ranger = OriginComponent<RangerProps, HTMLDivElement, number[]>((props) => {
    const rangerRef = NullAtom<HTMLDivElement>(null);
    const ranger = useRanger<HTMLDivElement>(rangerRef, () => ({
        values: props.model(),
        min: props.min ?? 0,
        max: props.max ?? 100,
        stepSize: props.stepSize ?? 1,
        steps: props.steps,
        tickSize: props.tickSize,
        ticks: props.ticks,
        onChange: (instance) => {
            props.model(() => instance.sortedValues as number[]);
        },
    }));
    const { instance: rangerInstance, handles } = ranger;
    return (
        <RangerCtx.Provider value={ranger}>
            <div ref={rangerRef} class="relative select-none h-1 bg-gray-200 rounded-md">
                {handles().map(
                    ({ value, onKeyDownHandler, onMouseDownHandler, onTouchStart, isActive }) => (
                        <button
                            onKeyDown={onKeyDownHandler}
                            onMouseDown={onMouseDownHandler}
                            onTouchStart={onTouchStart}
                            role="slider"
                            aria-orientation="horizontal"
                            aria-valuemin={rangerInstance.options.min}
                            aria-valuemax={rangerInstance.options.max}
                            aria-valuenow={value}
                            class={classHelper.base(
                                "absolute w-4 h-4 bg-white outline-none rounded-full transition-all border-2 border-primary-400",
                            )(isActive && "scale-125", "")}
                            style={{
                                top: "50%",
                                left: `${rangerInstance.getPercentageForValue(value)}%`,
                                "z-index": isActive ? "3" : "2",
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ),
                )}
                <Switch>
                    <Match when={props.mode === "single"}>
                        <HighlightRange index={1}></HighlightRange>
                    </Match>
                    <Match when={props.mode === "range"}>
                        <For
                            each={handles()
                                .map((_, index) => index)
                                .filter((i) => i % 2)}
                        >
                            {(index) => {
                                return <HighlightRange index={index}></HighlightRange>;
                            }}
                        </For>
                    </Match>
                </Switch>
            </div>
        </RangerCtx.Provider>
    );
});

export const HighlightRange = (props: { index: number }) => {
    const { instance: rangerInstance, handles } = RangerCtx.use();
    const getPercentageFromRanger = (index: number) => {
        if (!handles()?.[index]) return 0;
        return rangerInstance.getPercentageForValue(handles()[index].value);
    };
    return (
        <div
            class="absolute h-full bg-primary-400 z-1 rounded-md"
            style={{
                left: `${getPercentageFromRanger(props.index - 1)}%`,
                width: `calc(${getPercentageFromRanger(props.index)}% - ${getPercentageFromRanger(
                    props.index - 1,
                )}%)`,
            }}
        ></div>
    );
};
