import { type ResourceAtom, createCtx } from "@cn-ui/reactive";
import type { RuleItem } from "async-validator";

export const MagicFormCtx = /* @__PURE__ */ createCtx<{
    originData: unknown;
    disabled?: boolean;
    index?: number;
    validResult?: ResourceAtom<{
        errors: RuleItem[];
        fields: Record<string, RuleItem[]>;
    } | null>;
}>(undefined, true);
