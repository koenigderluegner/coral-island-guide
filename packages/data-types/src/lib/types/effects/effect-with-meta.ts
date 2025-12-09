import { EffectWithoutMeta } from './effect-without-meta';

export type EffectWithMeta<T extends string, R extends object> = EffectWithoutMeta<T> & { meta: R };
