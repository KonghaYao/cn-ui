import { JSXElement } from "solid-js"

export type InferArray<T> = T extends (infer U)[] ? U : never
export type JSXSlot<T = unknown> = JSXElement | ((input?: T) => JSXElement)