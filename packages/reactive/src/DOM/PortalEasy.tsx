import { Show } from "solid-js";
import { Portal } from "solid-js/web";
export type PortalProps = Parameters<typeof Portal>[0];
export interface PortalEasyProps extends PortalProps {
    portalled?: boolean;
}
export function PortalEasy(props: PortalEasyProps) {
    return (
        <Show when={props.portalled} fallback={props.children}>
            <Portal {...props} />
        </Show>
    );
}
