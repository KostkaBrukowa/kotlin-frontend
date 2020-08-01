export type Optional<T> = T | null | undefined;
export type NotOptional<T> = Exclude<T, null | undefined>;
