import { OriginComponent, PortalEasy, type PortalEasyProps, classHelper } from "@cn-ui/reactive";
import { type FloatingCoverProps, useFloatingCover } from "@cn-ui/reactive";
import { DotsMove3 } from "@cn-ui/svg-spinner";
import { omit } from "radash";
import type { JSXElement } from "solid-js";
import { Flex } from "../container/Flex";
import "./index.css"; // 引入 SVG 控制样式

export interface LoadingProps extends FloatingCoverProps, Omit<PortalEasyProps, "children"> {
    children?: JSXElement;
}

export const Loading = OriginComponent<LoadingProps>((props) => {
    const cover = useFloatingCover(props);
    return (
        <PortalEasy {...omit(props, ["children"])}>
            <Flex
                class={props.class(classHelper("cn-loading overflow-hidden bg-gray-100/70"))}
                style={props.style(cover.coverStyle())}
            >
                {props.children ?? (
                    <DotsMove3 height="64" width="64" class="fill-primary-400 stroke-primary-400" />
                )}
            </Flex>
        </PortalEasy>
    );
});
