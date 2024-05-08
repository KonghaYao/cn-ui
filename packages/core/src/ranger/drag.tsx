import { sleep } from "@cn-ui/reactive";
import { fireEvent } from "@storybook/test";

function isElement(obj: unknown): obj is Element {
    if (typeof obj !== "object") {
        return false;
    }
    let prototypeStr: string;
    let prototype: unknown;
    do {
        prototype = Object.getPrototypeOf(obj);
        // to work in iframe
        prototypeStr = Object.prototype.toString.call(prototype);
        // '[object Document]' is used to detect document
        if (prototypeStr === "[object Element]" || prototypeStr === "[object Document]") {
            return true;
        }
        obj = prototype;
        // null is the terminal of object
    } while (prototype !== null);
    return false;
}

function getElementClientCenter(element: Element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2,
    };
}

export async function drag(
    element: HTMLElement,
    {
        handler = element,
        to: inTo,
        delta,
        steps = 1,
        duration = 50,
    }: {
        handler?: Element;
        to?: { x: number; y: number } | Element;
        delta: { x?: number; y?: number };
        steps?: number;
        duration?: number;
    },
) {
    const getCoords = (charlie: Element | { x: number; y: number }) =>
        isElement(charlie) ? getElementClientCenter(charlie) : charlie;
    const from = getElementClientCenter(element);
    const to = delta
        ? {
              x: from.x + (delta.x ?? 0),
              y: from.y + (delta.y ?? 0),
          }
        : getCoords(inTo!);

    const step = {
        x: (to.x - from.x) / steps,
        y: (to.y - from.y) / steps,
    };

    const current = {
        clientX: from.x,
        clientY: from.y,
    };

    await fireEvent.mouseEnter(element, current);
    await fireEvent.mouseOver(element, current);
    await fireEvent.mouseMove(element, current);
    await fireEvent.mouseDown(element, current);
    for (let i = 0; i < steps; i++) {
        current.clientX += step.x;
        current.clientY += step.y;
        await sleep(duration / steps);
        await fireEvent.mouseMove(handler, current);
        await fireEvent.mouseUp(element, current);
    }
    await fireEvent.mouseUp(handler, current);
    await fireEvent.mouseUp(element, current);
}
