import { OriginComponent } from "@cn-ui/reactive";
import { qr } from "headless-qr";
import { createMemo } from "solid-js";
import "./qrcode.d";
export const QRCode = OriginComponent<QRCodeSvgProps, HTMLElement, string>((props) => {
    return (
        <div class="h-32 w-32 p-2 border rounded-lg">
            <QRCodeSvg v-model={props.model}></QRCodeSvg>
        </div>
    );
});

interface QRCodeSvgProps {
    version?: number;
    correction?: "M" | "L" | "Q" | "H";
    cellSize?: number;
}

export const QRCodeSvg = OriginComponent<QRCodeSvgProps, HTMLElement, string>((props) => {
    const modules = createMemo<(boolean | null)[][]>(() => qr(props.model(), props));
    const size = createMemo(() => modules().length);
    const cellSize = createMemo(() => props.cellSize ?? 4);

    return (
        <svg
            role="img"
            aria-label={props.model()}
            viewBox={`0 0 ${size() * cellSize()} ${size() * cellSize()}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {modules().map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                    if (cell) {
                        return (
                            <rect
                                x={cellIndex * cellSize()}
                                y={rowIndex * cellSize()}
                                width={cellSize()}
                                height={cellSize()}
                                stroke-width="0"
                                style={{
                                    fill: "var(--cn-text-design-primary-0)",
                                }}
                            />
                        );
                    }
                    return null;
                }),
            )}
        </svg>
    );
});
