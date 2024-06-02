import { NullAtom, OriginComponent, OriginDiv, atom } from "@cn-ui/reactive";
import { createMemo } from "solid-js";
import { watch } from "solidjs-use";
import type { CommonGroupListConfig } from "../groupList";
import { BaseInput } from "../input";
import { Popover, type PopoverExpose } from "../popover";
import { CascaderPanel, type CascaderPanelProps } from "./CascaderPanel";

export interface CascaderProps extends CascaderPanelProps {}
export const Cascader = OriginComponent<CascaderProps, HTMLDivElement, CommonGroupListConfig[]>(
    (props) => {
        const show = atom(false);
        const input = NullAtom<HTMLInputElement>(null);
        const inputWrapper = NullAtom<HTMLSpanElement>(null);
        /** readonly input text */
        const inputText = createMemo(() =>
            props
                .model()
                .map((item) => item.label)
                .join(" / "),
        );
        // 使 Popover 跟随移动
        const popoverInstance = NullAtom<PopoverExpose>(null);
        watch(props.model, () => popoverInstance()?.updatePosition());
        return (
            <OriginDiv prop={props}>
                <BaseInput ref={input} wrapperRef={inputWrapper} v-model={inputText} />
                <Popover
                    placement="bottom-start"
                    class="p-none"
                    v-model={show}
                    trigger="focus"
                    expose={popoverInstance}
                    popoverTarget={inputWrapper()!}
                    content={
                        <CascaderPanel
                            options={props.options}
                            v-model={props.model}
                            onSelected={props.onSelected}
                        />
                    }
                />
            </OriginDiv>
        );
    },
);
