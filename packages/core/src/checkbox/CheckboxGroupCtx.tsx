import { createCtx, type useSelect } from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";

export type CheckboxGroupCtxType = ReturnType<typeof useSelect<SelectOptionsType>>;
export const CheckboxGroupCtx = /* @__PURE__ */ createCtx<CheckboxGroupCtxType>({} as any);
