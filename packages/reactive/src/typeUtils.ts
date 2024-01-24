export type InferArray<T> = T extends (infer U)[] ? U : never
