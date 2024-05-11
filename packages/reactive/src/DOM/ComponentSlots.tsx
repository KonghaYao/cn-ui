import { type JSXSlot, ensureFunctionResult } from "@cn-ui/reactive";
import type { JSXElement } from "solid-js";

export class ComponentSlots<ISlotMap extends Record<string, () => JSXElement>> {
    constructor(
        public spaceName: string,
        public slots: ISlotMap,
    ) {}

    /** @private 组件内部使用 */
    renderSlotAsDefault<T>(slotName: keyof ISlotMap, propSlot: JSXSlot<T>, input?: T) {
        return ensureFunctionResult(propSlot, [input]) ?? this.getSlot(slotName)();
    }

    replaceSlot(slotName: keyof ISlotMap, slot: () => JSXElement) {
        /** @ts-ignore */
        this.slots[slotName] = slot;
    }
    mergeSlots(slots: Partial<ISlotMap>) {
        Object.assign(this.slots, slots);
    }

    getSlot(slotName: keyof ISlotMap) {
        return this.slots[slotName];
    }
    useSlot(slotName: keyof ISlotMap) {
        return ensureFunctionResult(this.getSlot(slotName));
    }
}
