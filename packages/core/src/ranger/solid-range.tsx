import { computed } from "@cn-ui/reactive";
import { RangerConfig, RangerOptions, Ranger } from "@tanstack/ranger";
import { Accessor, createEffect, createMemo, onMount } from "solid-js";

export * from "@tanstack/ranger";

export function useRanger<TTrackElement>(
    rangerRef: Accessor<TTrackElement | null>,
    options: Accessor<Omit<RangerOptions<TTrackElement>, "getRangerElement">>,
) {
    const rerender = () => {
        handles.recomputed();
    };
    const resolvedOptions = createMemo(() => {
        rangerRef();
        return {
            ...options(),
            getRangerElement: rangerRef,
            rerender,
        } as RangerConfig<TTrackElement>;
    });

    const instance = new Ranger<TTrackElement>(resolvedOptions());

    createEffect(() => {
        instance.setOptions(resolvedOptions());
    });

    createEffect(() => {
        return instance._willUpdate();
    });
    const handles = computed(() => {
        return instance.handles();
    });
    return { instance, handles };
}
