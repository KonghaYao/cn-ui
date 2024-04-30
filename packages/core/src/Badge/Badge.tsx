import {
    type FloatingCoverProps,
    OriginComponent,
    PortalEasy,
    computed,
    useFloatingCover,
} from "@cn-ui/reactive";
import { type JSX, type JSXElement, Match, Switch } from "solid-js";

/**
 * 定义 Badge 组件的属性接口。
 * Badge 组件用于展示一个小红点或者数字，可自定义颜色、大小、样式等。
 */
export interface BadgeProps extends FloatingCoverProps {
    /**
     * 自定义小圆点的颜色。
     * @type string
     */
    color?: string;

    /**
     * 展示的数字，大于 overflowCount 时显示为 +，为 0 时隐藏。
     * @type ReactNode
     */
    count?: JSXElement | number;

    /**
     * 不展示数字，只有一个小红点。
     * @type boolean
     * @default false
     */
    dot?: boolean;

    /**
     * 设置状态点的 style
     */
    dotStyle?: JSX.CSSProperties;

    /**
     * 展示封顶的数字值，超过该值则显示为 +。
     * @type number
     * @default 99
     */
    overflowCount?: number;

    /**
     * 当数值为 0 时，是否展示 Badge。
     * @type boolean
     * @default false
     */
    showZero?: boolean;

    /**
     * 设置 Badge 为状态点，可选值为 success、processing、default、error、warning。
     * @type 'success' | 'processing' | 'default' | 'error' | 'warning'
     * @dev
     */
    status?: "success" | "processing" | "default" | "error" | "warning";

    /**
     * 设置鼠标放在状态点上时显示的文字。
     * @type string
     */
    title?: string;
}
export const Badge = OriginComponent<BadgeProps>((props) => {
    const cover = useFloatingCover(props);
    const isNumberType = computed(() => typeof props.count === "number");
    const isOverflowCount = computed(
        () => typeof props.count === "number" && props.count > (props.overflowCount ?? 99),
    );
    const isDot = computed(() => props.dot || props.count === 0);
    return (
        <PortalEasy>
            <div class="cn-badge relative pointer-events-none" style={cover.coverStyle()}>
                <sup
                    class="absolute bg-error-400 text-white rounded-full p-[0.35rem] border border-design-pure pointer-events-auto cursor-default"
                    style={{
                        top: "-4px",
                        right: "-4px",
                        ...props.style(),
                    }}
                >
                    <Switch fallback={props.children}>
                        <Match when={isOverflowCount()}>{props.overflowCount ?? 99}+</Match>
                        <Match when={isDot()}>
                            <div>{props.showZero && 0}</div>
                        </Match>
                        <Match when={isNumberType()}>{props.count as JSXElement}</Match>
                    </Switch>
                </sup>
            </div>
        </PortalEasy>
    );
});
