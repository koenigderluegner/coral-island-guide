import { EffectsWithMeta, EffectWithMeta, EffectMetaForType } from '@ci/data-types';
import { convertEffectsWithoutMeta, RawEffectWithoutMeta } from './raw-effect-without-meta';

export type RawEffectWithMeta<T extends string, R extends object> = RawEffectWithoutMeta<T> & {
    Properties: R;
};

export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(
    rawEffect: RawEffectWithMeta<T, D>,
    transform: (properties: NoInfer<D>) => EffectMetaForType<NoInfer<T>>,
): Extract<EffectsWithMeta, { type: T }>;
export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(
    rawEffect: RawEffectWithMeta<T, D>,
): Extract<EffectsWithMeta, { type: T }>;
export function convertEffectsWithMeta<T extends EffectsWithMeta['type'], D extends object>(
    rawEffect: RawEffectWithMeta<T, D>,
    transform?: (properties: NoInfer<D>) => EffectMetaForType<NoInfer<T>>,
): EffectWithMeta<T, D | EffectMetaForType<NoInfer<T>>> {
    return {
        ...convertEffectsWithoutMeta(rawEffect),
        meta: transform ? transform(rawEffect.Properties) : rawEffect.Properties,
    };
}
