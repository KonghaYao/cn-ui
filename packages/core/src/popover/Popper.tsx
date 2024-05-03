import {
    type Atom,
    type JSXSlot,
    NullAtom,
    OriginComponent,
    atom,
    computed,
    ensureFunctionResult,
    extendsEvent,
    splitOneChild,
} from "@cn-ui/reactive";
import { PortalEasy } from "@cn-ui/reactive";
import type { Placement } from "@popperjs/core";
import { pick } from "radash";
import { Show, createEffect, createMemo, mergeProps, onMount } from "solid-js";
import { nextTick, onClickOutside, useEventListener } from "solidjs-use";
import { useFocusIn } from "./composable/useFocusIn";
import { usePopoverHover } from "./composable/usePopoverHover";
import "./index.css";
import { usePopper } from "./usePopper";
import { zIndexManager } from "./zIndexManager";

export interface FloatingComponentProp {
    zIndex?: number;
    lazy?: boolean;
    /** 挂载到全局上 */
    portalled?: boolean;
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
    trigger?: "click" | "hover" | "focus" | "none";
    expose?: (expose: PopoverExpose) => void;
    placement?: Placement;
    disabled?: boolean;
    sameWidth?: boolean;
    clickOutsideClose?: boolean;
    /** 支持通过 CSS 选择器直接虚拟链接对象, */
    popoverTarget?: string | Element;
}

export const Popover = OriginComponent<PopoverProps, HTMLElement, boolean>(
    (props) => {
        props = mergeProps({ lazy: true }, props);

        const [child, otherChildren] = splitOneChild(() => props.children);

        const popoverContent = NullAtom<HTMLElement>(null);
        // fix: 封装一层 child 避免初始化时序混乱
        const popoverTarget = computed(() => child() as HTMLElement);

        const arrow = NullAtom<HTMLElement>(null);
        const readyToRenderDom = atom(false);
        const { show, hide, update } = usePopper(
            popoverTarget,
            popoverContent,
            arrow,
            // 单独构建 atom 给配置，用于单独引用
            createMemo(() =>
                pick(props, ["placement", "disabled", "sameWidth", "lazy", "popoverTarget"]),
            ),
            () => props.model(),
            {
                beforeMount() {
                    readyToRenderDom(true);
                },
                mounted() {
                    props.onMounted?.();
                    nextTick(visibleChange); // 初始化完成，立即推迟进行一次渲染，爆炸状态正确
                },
            },
        );
        onMount(() => {
            props.expose?.({ show, hide, update });
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
        onClickOutside(
            popoverContent,
            () =>
                props.model() &&
                props.clickOutsideClose !== false &&
                props.trigger === "click" &&
                props.model(false),
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
        const visibleChange = () => (props.model() ? show() : hide());
        createEffect(visibleChange);

        const zIndex = computed(() => props.zIndex ?? zIndexManager.getIndex());
        createEffect(() => props.model() && zIndex(zIndexManager.getIndex()));

        // TODO 希望在水合之前隐藏，在水合之后显示
        const isHidden = computed(() => !props.model());
        return (
            <>
                {child()}
                {otherChildren()}
                <PortalEasy portalled={props.portalled}>
                    <Show when={readyToRenderDom()}>
                        <div
                            ref={(el) => {
                                popoverContent(el);
                                props.ref?.(el);
                            }}
                            class={props.class(
                                isHidden() && "hidden",
                                "absolute popover__content bg-design-floating p-1 rounded-md",
                            )}
                            style={{ ...props.style(), "z-index": zIndex() }}
                            role="tooltip"
                            {...extendsEvent(props)}
                        >
                            <div class="popover__arrow" ref={arrow} />
                            {ensureFunctionResult(props.content, [{ model: props.model }])}
                        </div>
                    </Show>
                </PortalEasy>
            </>
        );
    },
    {
        modelValue: false,
    },
);
