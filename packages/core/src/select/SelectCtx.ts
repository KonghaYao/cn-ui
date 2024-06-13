import { createCtx, type useSelect } from "@cn-ui/reactive";
import type { SelectOptionsType } from "@cn-ui/reactive";

export const SelectCtx =
    /* @__PURE__ */ createCtx<ReturnType<typeof useSelect<SelectOptionsType>>>();
