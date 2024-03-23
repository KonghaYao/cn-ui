export const getLabelFromOptions = <T extends { toString(): string }>(options: { label?: T; value: T }) => (options?.label ?? options.value).toString()
