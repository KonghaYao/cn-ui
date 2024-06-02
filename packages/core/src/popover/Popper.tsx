import {
    type Atom,
    type JSXSlot,
    NullAtom,
    OriginComponent,
    computed,
    ensureFunctionResult,
    extendsEvent,
    splitOneChild,
} from "@cn-ui/reactive";
import { zIndexManager } from "@cn-ui/reactive";
import type { Placement } from "@popperjs/core";
import { pick } from "radash";
import { createEffect, createMemo, mergeProps, onMount } from "solid-js";
import { nextTick, onClickOutside, useEventListener } from "solidjs-use";
import { usePopper } from "./Popper/usePopper";
import { useFocusIn } from "./composable/useFocusIn";
import { usePopoverHover } from "./composable/usePopoverHover";
import { PopoverArea } from "./global/PopoverArea";
import "./index.css";

export interface FloatingComponentProp {
    zIndex?: number;
    lazy?: boolean;
    // unmountOnExit 应该是附加到 PopoverContent, 暂时未实现
    // unmountOnExit?: boolean
    onMounted?: () => void;
}

export interface PopoverExpose extends ReturnType<typeof usePopper> {}

export interface PopoverProps extends FloatingComponentProp {
    content: JSXSlot<{ model: Atom<boolean> }>;
    /**
     * - click: 点击触发
     * - hover: 鼠标移入触发
     * - focus: 聚焦触发
     * - none: 完全受控模式
     */
    trigger?: "click" | "hover" | "focus" | "none" | "contextmenu";
    expose?: (expose: PopoverExpose) => void;
    placement?: Placement;
    disabled?: boolean;
    sameWidth?: boolean;
    clickOutsideClose?: boolean;
    /** 支持通过 CSS 选择器直接虚拟链接对象, */
    popoverTarget?: string | Element;
    fixed?: boolean;
}

export const Popover = OriginComponent<PopoverProps, HTMLElement, boolean>(
    (props) => {
        props = mergeProps({ lazy: true }, props);

        const [child, otherChildren] = splitOneChild(() => props.children);

        const popoverContent = NullAtom<HTMLElement>(null);
        // fix: 封装一层 child 避免初始化时序混乱
        const popoverTarget = computed(() => child() as HTMLElement);
        const arrow = NullAtom<HTMLElement>(null);
        const { updatePosition } = usePopper(
            popoverTarget,
            popoverContent,
            arrow,
            // 单独构建 atom 给配置，用于单独引用
            createMemo(() =>
                pick(props, ["placement", "disabled", "sameWidth", "lazy", "popoverTarget"]),
            ),
        );
        onMount(() => {
            props.expose?.({ updatePosition });
            const pTarget = props.popoverTarget!;
            const el = (
                typeof pTarget === "string" ? document.querySelector(pTarget)! : pTarget
            ) as HTMLElement;
            if (el) popoverTarget(el);
        });

        // hover
        const { hovering, hoveringState } = usePopoverHover([popoverTarget, popoverContent]);
        const contentHovering = hoveringState[1];
        const [focused] = useFocusIn(popoverTarget);

        // click
        useEventListener(
            popoverTarget,
            "pointerdown",
            () => (props.trigger === "click" || !props.trigger) && props.model((i) => !i),
        );

        useEventListener(popoverTarget, "contextmenu", (e) => {
            e.preventDefault();
            props.trigger === "contextmenu" && props.model() === false && props.model(true);
        });

        onClickOutside(
            popoverContent,
            () => {
                return (
                    props.model() &&
                    props.clickOutsideClose !== false &&
                    (props.trigger === "click" || props.trigger === "contextmenu") &&
                    props.model(false)
                );
            },
            {
                ignore: [popoverTarget],
            },
        );
        // 此处进行对 model 动态数据的统一
        createEffect(() => {
            switch (props.trigger) {
                case "hover":
                    return props.model(() => hovering());
                case "focus":
                    return props.model(() => focused() || contentHovering());
                case "none":
                    return;
            }
        });

        const zIndex = computed(() => props.zIndex ?? zIndexManager.getIndex());
        createEffect(() => props.model() && zIndex(zIndexManager.getIndex()));

        // TODO 希望在水合之前隐藏，在水合之后显示
        const isHidden = computed(() => !props.model());
        return (
            <>
                {child()}
                {otherChildren()}
                <PopoverArea.Portal show={() => props.model()}>
                    <div
                        ref={(el) => {
                            nextTick(() => {
                                // 延迟加载，防止 popper 获取不到 dom
                                popoverContent(el);
                            });
                            props.ref?.(el);
                        }}
                        class={props.class(
                            isHidden() && "hidden",
                            "absolute popover__content bg-design-thick p-1 rounded-md",
                        )}
                        style={{ ...props.style(), "z-index": zIndex() }}
                        role="tooltip"
                        {...extendsEvent(props)}
                    >
                        <div class="popover__arrow" ref={arrow} />
                        {ensureFunctionResult(props.content, [{ model: props.model }])}
                    </div>
                </PopoverArea.Portal>
            </>
        );
    },
    {
        modelValue: false,
    },
);
