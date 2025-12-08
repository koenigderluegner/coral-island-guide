type DistributivePartial<T> = T extends any ? Partial<T> : never;
export type SafeExtract<T, U extends DistributivePartial<T>> = Extract<T, U>;
