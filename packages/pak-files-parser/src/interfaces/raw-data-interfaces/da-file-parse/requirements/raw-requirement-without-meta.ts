import { EffectWithoutMeta } from "@ci/data-types";

export type RawRequirementWithoutMeta<T extends string> = {
    Type: `C_${T}Requirement`,
    Name: string
    Outer: string
    Class: `UScriptClass'C_${T}Requirement'`
}

export function convertRequirementWithoutMeta<T extends string>(rawEffect: RawRequirementWithoutMeta<T>): EffectWithoutMeta<T> {
    return {type: rawEffect.Type.replace(/^C_/, '').replace(/Requirement$/, '') as T};
}
