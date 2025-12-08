import { EffectsWithMeta, EffectWithMeta, MetaForType } from "@ci/data-types";
import { RawEffectWithoutMeta } from "./raw-effect-without-meta";

export type RawEffectWithMeta<T extends string, R extends object> = RawEffectWithoutMeta<T> & {
    Properties: R
}

export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(rawEffect: RawEffectWithMeta<T, D>, transform: (properties: NoInfer<D>) => MetaForType<NoInfer<T>>): Extract<EffectsWithMeta, { type: T }>;
export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(rawEffect: RawEffectWithMeta<T, D>): Extract<EffectsWithMeta, { type: T }>;
export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(rawEffect: RawEffectWithMeta<T, D>, transform?: (properties: NoInfer<D>) => MetaForType<NoInfer<T>>): EffectWithMeta<T, D | MetaForType<NoInfer<T>>> {
    return {
        type: rawEffect.Type.replace(/^C_/, '').replace(/Effect$/, '') as T,
        meta: transform ? transform(rawEffect.Properties) : rawEffect.Properties
    };
}
