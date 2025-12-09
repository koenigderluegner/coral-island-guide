import { EffectWithoutMeta } from '@ci/data-types';

export type RawEffectWithoutMeta<T extends string> = {
    Type: `C_${T}Effect`;
    Name: string;
    Outer: string;
    Class: `UScriptClass'C_${T}Effect'`;
};

export function convertEffectsWithoutMeta<T extends string>(rawEffect: RawEffectWithoutMeta<T>): EffectWithoutMeta<T> {
    return { type: rawEffect.Type.replace(/^C_/, '').replace(/Effect$/, '') as T };
}
